// Admin-only. Commits a CSV batch. Never trusts that the caller actually ran
// csv-validate first (or that rows weren't tampered with between preview and
// commit) -- re-validates from scratch, then delegates the atomic DB work to
// the import_csv_batch() SQL function, then fires off email sending
// asynchronously so a large batch never blocks the admin's HTTP response.
//
// Self-contained (no relative imports) so it can be pasted directly into the
// Supabase Dashboard's function editor. Keep this file's BITS_ID_REGEX /
// normalizeAchievement logic in sync with csv-validate/index.ts -- they must
// never disagree on what counts as valid.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const BITS_ID_REGEX = /^[A-Z0-9]{8,15}$/;
const REQUIRED_CSV_COLUMNS = ["name", "bits_id", "result", "event"] as const;

function normalizeBitsId(raw: string | null | undefined): string {
  return (raw ?? "").trim().toUpperCase();
}

function isValidBitsId(bitsId: string): boolean {
  return BITS_ID_REGEX.test(bitsId);
}

const SPECIAL_RESULT_VALUES = new Set([
  "SPECIAL",
  "SPECIAL AWARD",
  "BEST IDEA",
  "BEST PERFORMER",
  "SPECIAL MENTION",
]);

function normalizeAchievement(rawResult: string | null | undefined): string | null {
  const value = (rawResult ?? "").trim().toUpperCase();
  if (value === "PARTICIPANT") return "PARTICIPANT";
  if (["1ST PLACE", "FIRST PLACE", "1ST", "WINNER"].includes(value)) return "FIRST";
  if (["2ND PLACE", "SECOND PLACE", "2ND"].includes(value)) return "SECOND";
  if (["3RD PLACE", "THIRD PLACE", "3RD"].includes(value)) return "THIRD";
  if (SPECIAL_RESULT_VALUES.has(value)) return "SPECIAL";
  return null;
}

// Browser calls (supabase-js) send a CORS preflight OPTIONS request before
// the real POST, and check these headers on every response including error
// ones. Without this, the browser fetch fails before the function's own
// logic ever runs, surfacing as "Failed to send a request to the Edge
// Function" -- curl/Postman never hit this since they don't enforce CORS.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== "POST") return jsonResponse({ error: "method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return jsonResponse({ error: "missing Authorization header" }, 401);

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: isAdmin, error: adminErr } = await supabase.rpc("is_admin");
  if (adminErr || !isAdmin) return jsonResponse({ error: "not authorized" }, 403);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return jsonResponse({ error: "not authenticated" }, 401);

  const { data: adminRow, error: adminRowErr } = await supabase
    .from("admins")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();
  if (adminRowErr || !adminRow) return jsonResponse({ error: "admin record not found" }, 403);

  let body: { rows?: Array<Record<string, string>>; filename?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid JSON body" }, 400);
  }

  const rawRows = Array.isArray(body.rows) ? body.rows : [];
  if (rawRows.length === 0) return jsonResponse({ error: "no rows provided" }, 400);

  const cleanRows: Array<{
    bits_id: string;
    name: string;
    event_name: string;
    achievement: string;
  }> = [];
  const rejected: Array<{ row: number; reason: string }> = [];
  const seen = new Set<string>();

  rawRows.forEach((row, idx) => {
    const rowNum = idx + 1;
    const missing = REQUIRED_CSV_COLUMNS.filter((c) => !row[c] || String(row[c]).trim() === "");
    if (missing.length > 0) {
      rejected.push({ row: rowNum, reason: `missing required column(s): ${missing.join(", ")}` });
      return;
    }
    const bitsId = normalizeBitsId(row.bits_id);
    if (!isValidBitsId(bitsId)) {
      rejected.push({ row: rowNum, reason: `invalid BITS ID format: "${row.bits_id}"` });
      return;
    }
    const achievement = normalizeAchievement(row.result);
    if (!achievement) {
      rejected.push({ row: rowNum, reason: `unrecognized result value: "${row.result}"` });
      return;
    }
    const eventName = String(row.event).trim();
    const key = `${bitsId}|${eventName}|${achievement}`;
    if (seen.has(key)) {
      rejected.push({ row: rowNum, reason: "duplicate row within this file" });
      return;
    }
    seen.add(key);
    cleanRows.push({
      bits_id: bitsId,
      name: String(row.name).trim(),
      event_name: eventName,
      achievement,
    });
  });

  if (cleanRows.length === 0) {
    return jsonResponse({ error: "no valid rows to import", rejected }, 400);
  }

  const { data: result, error: importErr } = await supabase.rpc("import_csv_batch", {
    p_rows: cleanRows,
    p_uploaded_by: adminRow.id,
    p_original_filename: body.filename ?? null,
  });

  if (importErr) return jsonResponse({ error: importErr.message }, 500);

  const awardedRows = (result.rows ?? []).filter(
    (r: { status: string }) => r.status === "awarded"
  );

  const sendEmailsPromise = fetch(`${SUPABASE_URL}/functions/v1/send-emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
      "x-internal-secret": Deno.env.get("INTERNAL_FUNCTION_SECRET") ?? "",
    },
    body: JSON.stringify({
      type: "EVENT_BATCH",
      batch_id: result.batch_id,
      rows: awardedRows,
    }),
  }).catch((err) => console.error("send-emails invoke failed", err));

  // Supabase Edge Runtime: keep the background email send alive after the
  // response below is returned, without making the admin wait for it.
  // deno-lint-ignore no-explicit-any
  const edgeRuntime = (globalThis as any).EdgeRuntime;
  if (edgeRuntime?.waitUntil) {
    edgeRuntime.waitUntil(sendEmailsPromise);
  }

  return jsonResponse({ ...result, rejectedBeforeImport: rejected });
});
