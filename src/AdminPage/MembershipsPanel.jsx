import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useConfirm } from "./ConfirmDialog.jsx";

export default function MembershipsPanel() {
  const confirm = useConfirm();
  const [pending, setPending] = useState([]); // [{ id, member_id, membership_type, period_label, members: { name, bits_id } }]
  const [activeSemester, setActiveSemester] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpiring, setIsExpiring] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState(null);

  const load = async () => {
    setIsLoading(true);
    const [{ data: pendingData }, { data: activeData }] = await Promise.all([
      supabase
        .from("membership_periods")
        .select("id,member_id,membership_type,period_label,members(name,bits_id)")
        .eq("status", "PENDING")
        .order("created_at", { ascending: true }),
      supabase
        .from("membership_periods")
        .select("member_id,period_label,members(name,bits_id)")
        .eq("status", "ACTIVE")
        .eq("membership_type", "SEMESTER")
        .order("started_at", { ascending: true }),
    ]);
    setPending(pendingData ?? []);
    setActiveSemester(activeData ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleActivate = async (row) => {
    const ok = await confirm(
      `Confirm payment and activate ${row.members?.name}'s membership? This will also pay out any pending referral bonus.`
    );
    if (!ok) return;
    setBusyId(row.id);
    setMessage(null);
    const { error } = await supabase.functions.invoke("admin-activate-membership", {
      body: { membershipPeriodId: row.id },
    });
    setBusyId(null);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    load();
  };

  const handleReject = async (row) => {
    if (!(await confirm(`Reject ${row.members?.name}'s pending registration? This cannot be undone.`))) return;
    setBusyId(row.id);
    setMessage(null);
    const { error } = await supabase.rpc("admin_reject_membership", {
      p_membership_period_id: row.id,
    });
    setBusyId(null);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    load();
  };

  const handleBulkExpire = async () => {
    if (activeSemester.length === 0) return;
    const ok = await confirm(
      `Expire all ${activeSemester.length} active semester membership(s) shown below? This cannot be undone.`
    );
    if (!ok) return;

    setIsExpiring(true);
    setMessage(null);
    const { data, error } = await supabase.rpc("admin_bulk_expire_semester_memberships");
    setIsExpiring(false);

    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }

    setMessage({ type: "success", text: `Expired ${data} membership(s).` });
    load();
  };

  return (
    <div className="max-w-3xl mx-auto">
      {message && (
        <p className={`text-sm mb-4 ${message.type === "error" ? "text-red-400" : "text-green-400"}`}>
          {message.text}
        </p>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-3 text-white py-10">
          <Loader2 className="animate-spin" size={20} />
          Loading memberships…
        </div>
      )}

      {!isLoading && (
        <>
          <h3 className="text-white font-semibold mb-4">Pending Activation ({pending.length})</h3>

          {pending.length === 0 ? (
            <p className="text-gray-400 text-center py-6 mb-8">No registrations awaiting payment confirmation.</p>
          ) : (
            <div className="bg-black border border-gray-700 rounded-xl divide-y divide-gray-800 mb-8">
              {pending.map((row) => (
                <div key={row.id} className="px-4 py-3 flex justify-between items-center gap-3">
                  <div>
                    <p className="text-white text-sm">{row.members?.name}</p>
                    <p className="text-gray-500 text-xs">
                      {row.members?.bits_id} — {row.membership_type === "LIFETIME" ? "Life time" : "Individual"} —{" "}
                      {row.period_label}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleActivate(row)}
                      disabled={busyId === row.id}
                      className="bg-green-950 text-green-300 text-xs font-semibold py-2 px-3 rounded-lg border border-green-800 hover:bg-green-900 transition disabled:opacity-60"
                    >
                      Activate
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(row)}
                      disabled={busyId === row.id}
                      className="bg-red-950 text-red-300 text-xs font-semibold py-2 px-3 rounded-lg border border-red-800 hover:bg-red-900 transition disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold">Active Semester Memberships ({activeSemester.length})</h3>
            <button
              type="button"
              onClick={handleBulkExpire}
              disabled={isExpiring || activeSemester.length === 0}
              className="bg-red-950 text-red-300 text-sm font-semibold py-2 px-4 rounded-lg border border-red-800 hover:bg-red-900 transition disabled:opacity-60 flex items-center gap-2"
            >
              {isExpiring && <Loader2 className="animate-spin" size={14} />}
              Expire All Lapsed (End of Semester)
            </button>
          </div>

          {activeSemester.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No active semester memberships.</p>
          ) : (
            <div className="bg-black border border-gray-700 rounded-xl divide-y divide-gray-800">
              {activeSemester.map((m) => (
                <div key={m.member_id} className="px-4 py-3 flex justify-between">
                  <div>
                    <p className="text-white text-sm">{m.members?.name}</p>
                    <p className="text-gray-500 text-xs">{m.members?.bits_id}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{m.period_label}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
