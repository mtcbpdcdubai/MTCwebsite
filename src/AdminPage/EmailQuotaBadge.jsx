import { useEffect, useState } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

// Matches the Resend plan's 100/day sending limit (see send-emails Edge
// Function, which batches in groups of 95 for the same reason). This is a
// live count over email_log, not a stored counter, so it "resets" on its own
// every day at UTC midnight -- the same boundary Resend uses for its quota.
const RESEND_DAILY_LIMIT = 100;
const POLL_INTERVAL_MS = 30000;

function startOfTodayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
}

export default function EmailQuotaBadge() {
  const [sentToday, setSentToday] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCount = async () => {
    const { count } = await supabase
      .from("email_log")
      .select("id", { count: "exact", head: true })
      .eq("status", "sent")
      .gte("sent_at", startOfTodayUTC());

    setSentToday(count ?? 0);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const remaining = sentToday != null ? Math.max(RESEND_DAILY_LIMIT - sentToday, 0) : null;
  const isNearLimit = sentToday != null && sentToday >= RESEND_DAILY_LIMIT * 0.7;
  const isAtLimit = sentToday != null && sentToday >= RESEND_DAILY_LIMIT;

  return (
    <div
      className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm ${
        isAtLimit
          ? "border-red-500/40 bg-red-500/10 text-red-400"
          : isNearLimit
          ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
          : "border-gray-700 bg-black text-gray-300"
      }`}
      title="Resend's daily sending limit resets at midnight UTC"
    >
      <Mail size={14} />
      {isLoading ? (
        <span className="flex items-center gap-1">
          <RefreshCw size={12} className="animate-spin" />
          Loading…
        </span>
      ) : (
        <span>
          <strong className="font-semibold">{sentToday}</strong> / {RESEND_DAILY_LIMIT} emails sent
          today
          {isAtLimit
            ? " — limit reached"
            : isNearLimit
            ? ` — only ${remaining} left`
            : ""}
        </span>
      )}
      <button
        type="button"
        onClick={fetchCount}
        aria-label="Refresh email count"
        className="ml-1 opacity-60 hover:opacity-100 transition"
      >
        <RefreshCw size={12} />
      </button>
    </div>
  );
}
