// Internal-only. Called by csv-import (after a commit) and register-member
// (after a referral completes) -- never by the frontend directly. Uses the
// service role key (auto-injected by the Supabase platform) since it needs
// to read member emails/names regardless of who triggered it, and holds the
// RESEND_API_KEY secret, which must never reach frontend code.
//
// Resend's account is on the 100-emails/day plan, so any batch is chunked
// into groups of 95 (headroom, not the literal ceiling) with a short pause
// between chunks -- never all fired at once.
// Self-contained (no relative imports) so it can be pasted directly into the
// Supabase Dashboard's function editor.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const INTERNAL_SECRET = Deno.env.get("INTERNAL_FUNCTION_SECRET");
const FROM_ADDRESS = Deno.env.get("RESEND_FROM_ADDRESS") ?? "MTC BITS <onboarding@resend.dev>";
const REPLY_TO = Deno.env.get("RESEND_REPLY_TO") ?? "microsofttechclub@dubai.bits-pilani.ac.in";

const EMAIL_BATCH_SIZE = 95;
const EMAIL_BATCH_DELAY_MS = 1200;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// A brand-new sending domain has zero reputation with mail providers, so
// anything that makes the message look more like a real, deliberate email
// (a plain-text alternative, a real reply-to, a proper footer) meaningfully
// helps avoid the spam folder. HTML-only mail with no text part is one of
// the more common, well-documented spam signals -- always send both.
async function sendEmail(to: string, subject: string, html: string, text: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html, text, reply_to: REPLY_TO }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

const FOOTER_HTML = `
  <p style="color:#888;font-size:12px;margin-top:24px;">
    Microsoft Tech Club, BITS Pilani Dubai Campus —
    <a href="mailto:microsofttechclub@dubai.bits-pilani.ac.in">microsofttechclub@dubai.bits-pilani.ac.in</a>
  </p>
`;
const FOOTER_TEXT = "\n\n--\nMicrosoft Tech Club, BITS Pilani Dubai Campus\nmicrosofttechclub@dubai.bits-pilani.ac.in";

const ACHIEVEMENT_LABEL: Record<string, string> = {
  PARTICIPANT: "participated in",
  FIRST: "secured 1st Place in",
  SECOND: "secured 2nd Place in",
  THIRD: "secured 3rd Place in",
  SPECIAL: "received the Special Award in",
};

function templateFor(achievement: string) {
  if (achievement === "SPECIAL") return "SPECIAL_AWARD";
  if (achievement === "PARTICIPANT") return "PARTICIPANT";
  return "WINNER";
}

async function logEmail(entry: Record<string, unknown>) {
  const { error } = await supabase.from("email_log").insert(entry);
  if (error) console.error("email_log insert failed", error);
}

// Shape of each "awarded" row csv-import passes through after a commit.
interface EventBatchRow {
  member_id: string;
  event_name: string;
  achievement: string;
  points: number;
}

// Shape of the jsonb register_member() returns, forwarded by register-member.
interface RegistrationResult {
  member_id: string;
  referrer_id?: string;
  referral_id?: string;
  referral_applied?: boolean;
}

async function sendEventBatch(batchId: string, rows: EventBatchRow[]) {
  if (rows.length === 0) return;

  const memberIds = [...new Set(rows.map((r) => r.member_id))];
  const { data: members } = await supabase.from("members").select("id,name,email").in("id", memberIds);
  const memberById = new Map((members ?? []).map((m) => [m.id, m]));

  const { data: totals } = await supabase
    .from("member_totals")
    .select("member_id,total_points")
    .in("member_id", memberIds);
  const totalByMember = new Map((totals ?? []).map((t) => [t.member_id, t.total_points]));

  for (let i = 0; i < rows.length; i += EMAIL_BATCH_SIZE) {
    const chunk = rows.slice(i, i + EMAIL_BATCH_SIZE);

    for (const row of chunk) {
      const member = memberById.get(row.member_id);
      const template = templateFor(row.achievement);
      if (!member) {
        await logEmail({
          member_id: row.member_id,
          import_batch_id: batchId,
          template,
          status: "failed",
          error: "member not found",
        });
        continue;
      }

      const totalPoints = totalByMember.get(row.member_id) ?? row.points;
      const subject =
        template === "PARTICIPANT"
          ? `🎉 You earned points in ${row.event_name}!`
          : `🎉 Congratulations on ${row.event_name}!`;
      const achievementLabel = ACHIEVEMENT_LABEL[row.achievement] ?? "participated in";
      const html = `
        <p>Hi ${member.name},</p>
        <p>Congratulations! 🎉</p>
        <p>You ${achievementLabel} <strong>${row.event_name}</strong> and earned <strong>+${row.points} point(s)</strong>.</p>
        <p>Your current MTC Points: <strong>${totalPoints}</strong></p>
        <p>Keep participating and climbing the leaderboard! 🚀</p>
        <p>— MTC BITS</p>
        ${FOOTER_HTML}
      `;
      const text =
        `Hi ${member.name},\n\n` +
        `Congratulations! You ${achievementLabel} ${row.event_name} and earned +${row.points} point(s).\n` +
        `Your current MTC Points: ${totalPoints}\n\n` +
        `Keep participating and climbing the leaderboard!\n\n— MTC BITS` +
        FOOTER_TEXT;

      try {
        await sendEmail(member.email, subject, html, text);
        await logEmail({ member_id: row.member_id, import_batch_id: batchId, template, status: "sent" });
      } catch (err) {
        await logEmail({
          member_id: row.member_id,
          import_batch_id: batchId,
          template,
          status: "failed",
          error: String(err),
        });
      }
    }

    if (i + EMAIL_BATCH_SIZE < rows.length) {
      await sleep(EMAIL_BATCH_DELAY_MS);
    }
  }
}

async function sendReferralEmails(registration: RegistrationResult) {
  if (!registration?.referral_applied) return;

  const ids = [registration.member_id, registration.referrer_id].filter(Boolean);
  const { data: members } = await supabase.from("members").select("id,name,email").in("id", ids);
  const memberById = new Map((members ?? []).map((m) => [m.id, m]));

  const { data: totals } = await supabase
    .from("member_totals")
    .select("member_id,total_points")
    .in("member_id", ids);
  const totalByMember = new Map((totals ?? []).map((t) => [t.member_id, t.total_points]));

  const referrer = memberById.get(registration.referrer_id);
  if (referrer) {
    const referrerTotal = totalByMember.get(registration.referrer_id) ?? "";
    const html = `
      <p>🎉 Referral Bonus!</p>
      <p>You referred a new MTC member!</p>
      <p>You earned <strong>+2 points</strong>.</p>
      <p>Your current MTC Points: <strong>${referrerTotal}</strong></p>
      <p>Keep growing the MTC community! 🚀</p>
      ${FOOTER_HTML}
    `;
    const text =
      `Referral Bonus!\n\nYou referred a new MTC member! You earned +2 points.\n` +
      `Your current MTC Points: ${referrerTotal}\n\nKeep growing the MTC community!` +
      FOOTER_TEXT;
    try {
      await sendEmail(referrer.email, "🎉 Referral Bonus!", html, text);
      await logEmail({
        member_id: registration.referrer_id,
        referral_id: registration.referral_id,
        template: "REFERRAL_REFERRER",
        status: "sent",
      });
    } catch (err) {
      await logEmail({
        member_id: registration.referrer_id,
        referral_id: registration.referral_id,
        template: "REFERRAL_REFERRER",
        status: "failed",
        error: String(err),
      });
    }
  }

  const newMember = memberById.get(registration.member_id);
  if (newMember) {
    const newMemberTotal = totalByMember.get(registration.member_id) ?? "";
    const html = `
      <p>🎉 Welcome to MTC!</p>
      <p>You joined MTC through a referral and earned <strong>+2 points</strong>.</p>
      <p>Your current MTC Points: <strong>${newMemberTotal}</strong></p>
      <p>Welcome to the community! 🚀</p>
      ${FOOTER_HTML}
    `;
    const text =
      `Welcome to MTC!\n\nYou joined MTC through a referral and earned +2 points.\n` +
      `Your current MTC Points: ${newMemberTotal}\n\nWelcome to the community!` +
      FOOTER_TEXT;
    try {
      await sendEmail(newMember.email, "🎉 Welcome to MTC!", html, text);
      await logEmail({
        member_id: registration.member_id,
        referral_id: registration.referral_id,
        template: "REFERRAL_NEW_MEMBER",
        status: "sent",
      });
    } catch (err) {
      await logEmail({
        member_id: registration.member_id,
        referral_id: registration.referral_id,
        template: "REFERRAL_NEW_MEMBER",
        status: "failed",
        error: String(err),
      });
    }
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "method not allowed" }, 405);

  if (INTERNAL_SECRET) {
    if (req.headers.get("x-internal-secret") !== INTERNAL_SECRET) {
      return jsonResponse({ error: "not authorized" }, 403);
    }
  }

  let body: { type?: string; batch_id?: string; rows?: EventBatchRow[]; registration?: RegistrationResult };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid JSON body" }, 400);
  }

  try {
    if (body.type === "EVENT_BATCH") {
      await sendEventBatch(body.batch_id!, body.rows ?? []);
    } else if (body.type === "REFERRAL") {
      if (!body.registration) return jsonResponse({ error: "missing registration" }, 400);
      await sendReferralEmails(body.registration);
    } else {
      return jsonResponse({ error: "unknown email batch type" }, 400);
    }
  } catch (err) {
    console.error("send-emails failed", err);
    return jsonResponse({ error: String(err) }, 500);
  }

  return jsonResponse({ ok: true });
});
