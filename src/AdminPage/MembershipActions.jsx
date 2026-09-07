import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useConfirm } from "./ConfirmDialog.jsx";

const TYPE_LABEL = { LIFETIME: "Life time", SEMESTER: "Individual (semester)" };

export default function MembershipActions({ memberId, memberName }) {
  const confirm = useConfirm();
  const [status, setStatus] = useState(null); // { id, membership_type, status, period_label }
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRenewForm, setShowRenewForm] = useState(false);
  const [renewType, setRenewType] = useState("SEMESTER");
  const [renewLabel, setRenewLabel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("member_membership_status")
      .select("id,membership_type,status,period_label")
      .eq("member_id", memberId)
      .maybeSingle();
    setStatus(data ?? null);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
    setShowRenewForm(false);
    setError(null);
  }, [memberId]);

  const handleExpire = async () => {
    if (!status) return;
    if (!(await confirm(`Expire ${memberName}'s current membership? This cannot be undone.`))) return;
    setIsSubmitting(true);
    setError(null);
    const { error: rpcError } = await supabase.rpc("admin_expire_membership", {
      p_membership_period_id: status.id,
    });
    setIsSubmitting(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    load();
  };

  const handleActivate = async () => {
    if (!status) return;
    const ok = await confirm(
      `Confirm payment and activate ${memberName}'s membership? This will also pay out any pending referral bonus.`
    );
    if (!ok) return;
    setIsSubmitting(true);
    setError(null);
    const { error: fnError } = await supabase.functions.invoke("admin-activate-membership", {
      body: { membershipPeriodId: status.id },
    });
    setIsSubmitting(false);
    if (fnError) {
      setError(fnError.message);
      return;
    }
    load();
  };

  const handleReject = async () => {
    if (!status) return;
    if (!(await confirm(`Reject ${memberName}'s pending registration? This cannot be undone.`))) return;
    setIsSubmitting(true);
    setError(null);
    const { error: rpcError } = await supabase.rpc("admin_reject_membership", {
      p_membership_period_id: status.id,
    });
    setIsSubmitting(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    load();
  };

  const handleRenew = async (e) => {
    e.preventDefault();
    if (!(await confirm(`Start a new ${TYPE_LABEL[renewType]} membership period for ${memberName}?`))) return;
    setIsSubmitting(true);
    setError(null);
    const { error: rpcError } = await supabase.rpc("admin_start_membership_period", {
      p_member_id: memberId,
      p_membership_type: renewType,
      p_period_label: renewLabel.trim() || null,
    });
    setIsSubmitting(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    setShowRenewForm(false);
    setRenewLabel("");
    load();
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center gap-2 text-gray-400 text-sm">
        <Loader2 className="animate-spin" size={14} />
        Loading membership status…
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3">
      <h4 className="text-white font-semibold text-sm">Membership</h4>

      {status ? (
        <p className="text-gray-300 text-sm">
          {TYPE_LABEL[status.membership_type] ?? status.membership_type} —{" "}
          <span
            className={
              status.status === "ACTIVE"
                ? "text-green-400"
                : status.status === "PENDING"
                  ? "text-yellow-400"
                  : "text-red-400"
            }
          >
            {status.status}
          </span>{" "}
          <span className="text-gray-500">({status.period_label})</span>
        </p>
      ) : (
        <p className="text-gray-500 text-sm">No membership period on record.</p>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <div className="flex gap-2">
        {status?.status === "PENDING" && (
          <>
            <button
              type="button"
              onClick={handleActivate}
              disabled={isSubmitting}
              className="bg-green-950 text-green-300 text-xs font-semibold py-2 px-3 rounded-lg border border-green-800 hover:bg-green-900 transition disabled:opacity-60"
            >
              Confirm Payment & Activate
            </button>
            <button
              type="button"
              onClick={handleReject}
              disabled={isSubmitting}
              className="bg-red-950 text-red-300 text-xs font-semibold py-2 px-3 rounded-lg border border-red-800 hover:bg-red-900 transition disabled:opacity-60"
            >
              Reject
            </button>
          </>
        )}
        {status?.status === "ACTIVE" && status.membership_type === "SEMESTER" && (
          <button
            type="button"
            onClick={handleExpire}
            disabled={isSubmitting}
            className="bg-red-950 text-red-300 text-xs font-semibold py-2 px-3 rounded-lg border border-red-800 hover:bg-red-900 transition disabled:opacity-60"
          >
            Expire Membership
          </button>
        )}
        {status?.status !== "PENDING" && (
          <button
            type="button"
            onClick={() => setShowRenewForm((v) => !v)}
            disabled={isSubmitting}
            className="bg-neutral-800 text-white text-xs font-semibold py-2 px-3 rounded-lg border border-white/20 hover:bg-neutral-700 transition disabled:opacity-60"
          >
            Renew / Start New Period
          </button>
        )}
      </div>

      {showRenewForm && (
        <form onSubmit={handleRenew} className="space-y-2 pt-2 border-t border-gray-800">
          <select
            value={renewType}
            onChange={(e) => setRenewType(e.target.value)}
            disabled={isSubmitting}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-white/50 focus:outline-none"
          >
            <option value="SEMESTER">Individual (semester)</option>
            <option value="LIFETIME">Life time</option>
          </select>
          <input
            value={renewLabel}
            onChange={(e) => setRenewLabel(e.target.value)}
            placeholder="Period label (optional, defaults to current period)"
            disabled={isSubmitting}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-white/50 focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-neutral-800 text-white text-xs font-semibold py-2 px-4 rounded-lg border border-white/20 hover:bg-neutral-700 transition disabled:opacity-60 flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="animate-spin" size={14} />}
            Confirm
          </button>
        </form>
      )}
    </div>
  );
}
