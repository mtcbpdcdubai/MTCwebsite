// Admin-only. Confirms payment for a PENDING membership period: calls
// admin_activate_membership() (the only place a period becomes ACTIVE and
// the only place referral points get created), then -- only if that
// activation completed a referral -- fires the welcome/referral emails.
// This is the one admin membership action that needs an Edge Function
// wrapper rather than a plain client-side RPC call, since send-emails is
// internal-only and needs the INTERNAL_FUNCTION_SECRET, which only a
// server-side function can hold.
//
// Self-contained (no relative imports) so it can be pasted directly into the
// Supabase Dashboard's function editor.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

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

interface ActivationResult {
  member_id: string;
  referral_completed: boolean;
  referrer_id?: string;
  referral_id?: string;
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

  let body: { membershipPeriodId?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid JSON body" }, 400);
  }

  if (!body.membershipPeriodId) return jsonResponse({ error: "missing membershipPeriodId" }, 400);

  const { data, error } = await supabase.rpc("admin_activate_membership", {
    p_membership_period_id: body.membershipPeriodId,
  });

  if (error) return jsonResponse({ error: error.message }, 400);

  const result = data as ActivationResult;

  if (result.referral_completed) {
    const sendEmailsPromise = fetch(`${SUPABASE_URL}/functions/v1/send-emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "x-internal-secret": Deno.env.get("INTERNAL_FUNCTION_SECRET") ?? "",
      },
      body: JSON.stringify({
        type: "REFERRAL",
        registration: {
          member_id: result.member_id,
          referrer_id: result.referrer_id,
          referral_id: result.referral_id,
          referral_applied: true,
        },
      }),
    }).catch((err) => console.error("send-emails invoke failed", err));

    // deno-lint-ignore no-explicit-any
    const edgeRuntime = (globalThis as any).EdgeRuntime;
    if (edgeRuntime?.waitUntil) {
      edgeRuntime.waitUntil(sendEmailsPromise);
    }
  }

  return jsonResponse(result);
});
