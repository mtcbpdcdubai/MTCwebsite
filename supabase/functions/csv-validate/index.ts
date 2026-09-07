// Admin-only. Re-validates every row against LIVE database state (existing
// members, already-imported event+achievement combos, intra-file dupes) so
// the preview the admin sees before confirming is accurate -- this can't be a
// pure client-side check since the browser has no bulk read access to
// members/point_transactions.
//
// Self-contained (no relative imports) so it can be pasted directly into the
// Supabase Dashboard's function editor. Keep this file's BITS_ID_REGEX /
// normalizeAchievement logic in sync with csv-import/index.ts -- they must
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

  let body: { rows?: Array<Record<string, string>> };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid JSON body" }, 400);
  }

  const rawRows = Array.isArray(body.rows) ? body.rows : [];
  if (rawRows.length === 0) return jsonResponse({ error: "no rows provided" }, 400);

  const seenInFile = new Set<string>();
  const invalid: Array<{ row: number; reason: string; data: Record<string, string> }> = [];
  const duplicateInFile: Array<{ row: number; reason: string; data: Record<string, string> }> = [];
  const candidates: Array<{
    row: number;
    bits_id: string;
    name: string;
    event_name: string;
    achievement: string;
  }> = [];

  rawRows.forEach((row, idx) => {
    const rowNum = idx + 1;
    const missing = REQUIRED_CSV_COLUMNS.filter((c) => !row[c] || String(row[c]).trim() === "");
    if (missing.length > 0) {
      invalid.push({ row: rowNum, reason: `missing required column(s): ${missing.join(", ")}`, data: row });
      return;
    }

    const bitsId = normalizeBitsId(row.bits_id);
    if (!isValidBitsId(bitsId)) {
      invalid.push({ row: rowNum, reason: `invalid BITS ID format: "${row.bits_id}"`, data: row });
      return;
    }

    const achievement = normalizeAchievement(row.result);
    if (!achievement) {
      invalid.push({ row: rowNum, reason: `unrecognized result value: "${row.result}"`, data: row });
      return;
    }

    const eventName = String(row.event).trim();
    const dedupeKey = `${bitsId}|${eventName}|${achievement}`;
    if (seenInFile.has(dedupeKey)) {
      duplicateInFile.push({ row: rowNum, reason: "duplicate row within this file", data: row });
      return;
    }
    seenInFile.add(dedupeKey);

    candidates.push({
      row: rowNum,
      bits_id: bitsId,
      name: String(row.name).trim(),
      event_name: eventName,
      achievement,
    });
  });

  const bitsIds = [...new Set(candidates.map((r) => r.bits_id))];
  const { data: existingMembers } = bitsIds.length
    ? await supabase.from("members").select("id,bits_id").in("bits_id", bitsIds)
    : { data: [] as Array<{ id: string; bits_id: string }> };

  const memberByBitsId = new Map((existingMembers ?? []).map((m) => [m.bits_id, m]));
  const memberIds = [...memberByBitsId.values()].map((m) => m.id);

  const { data: existingTx } = memberIds.length
    ? await supabase
        .from("point_transactions")
        .select("member_id,event_name,achievement")
        .eq("source", "EVENT")
        .in("member_id", memberIds)
    : { data: [] as Array<{ member_id: string; event_name: string; achievement: string }> };

  const existingTxKeys = new Set(
    (existingTx ?? []).map((t) => `${t.member_id}|${t.event_name}|${t.achievement}`)
  );

  const readyToImport: Array<Record<string, unknown>> = [];
  const alreadyImported: Array<Record<string, unknown>> = [];

  for (const row of candidates) {
    const member = memberByBitsId.get(row.bits_id);
    if (!member) {
      invalid.push({
        row: row.row,
        reason: `no member found with BITS ID "${row.bits_id}" -- they must register via /join first`,
        data: row as unknown as Record<string, string>,
      });
      continue;
    }
    const key = `${member.id}|${row.event_name}|${row.achievement}`;
    if (existingTxKeys.has(key)) {
      alreadyImported.push({ ...row, reason: "already imported for this event/achievement" });
      continue;
    }
    readyToImport.push({ ...row, member_id: member.id });
  }

  return jsonResponse({
    summary: {
      total: rawRows.length,
      valid: readyToImport.length,
      invalid: invalid.length,
      duplicateInFile: duplicateInFile.length,
      alreadyImported: alreadyImported.length,
    },
    readyToImport,
    invalid,
    duplicateInFile,
    alreadyImported,
  });
});
