// Public (no admin auth). Thin wrapper around the register_member() SQL
// function: the DB transaction is the atomic source of truth (member +
// pending membership period + pending referral, all-or-nothing); this
// function's only extra job is turning raised exception codes into friendly
// messages. No emails fire here and no points are awarded here -- the
// membership starts PENDING and stays that way (referral included) until an
// admin confirms payment via admin-activate-membership, which is the only
// place points get created and welcome/referral emails get sent.
//
// Self-contained (no relative imports) so it can be pasted directly into the
// Supabase Dashboard's function editor.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

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

const FRIENDLY_ERRORS: Record<string, string> = {
  invalid_bits_id: "That doesn't look like a valid BITS ID.",
  invalid_name: "Please enter your name.",
  invalid_email: "Please enter a valid email address.",
  already_registered: "This BITS ID is already registered with MTC.",
  invalid_referral_code: "That referral code wasn't found. Double-check it or leave it blank.",
  invalid_membership_type: "Please pick a membership plan.",
  invalid_whatsapp_number: "Please enter your WhatsApp number.",
};

const MEMBERSHIP_TYPES = new Set(["LIFETIME", "SEMESTER"]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (req.method !== "POST") return jsonResponse({ error: "method not allowed" }, 405);

  let body: {
    bitsId?: string;
    name?: string;
    email?: string;
    referralCode?: string;
    membershipType?: string;
    whatsappNumber?: string;
  };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid JSON body" }, 400);
  }

  if (!MEMBERSHIP_TYPES.has(body.membershipType ?? "")) {
    return jsonResponse({ error: FRIENDLY_ERRORS.invalid_membership_type }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase.rpc("register_member", {
    p_bits_id: body.bitsId ?? "",
    p_name: body.name ?? "",
    p_email: body.email ?? "",
    p_membership_type: body.membershipType,
    p_whatsapp_number: body.whatsappNumber ?? "",
    p_referral_code: body.referralCode || null,
  });

  if (error) {
    const friendly = FRIENDLY_ERRORS[error.message] ?? "Registration failed. Please try again.";
    return jsonResponse({ error: friendly }, 400);
  }

  return jsonResponse(data);
});
