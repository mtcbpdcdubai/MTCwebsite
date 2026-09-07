import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import PointsHistoryTable from "../LeaderboardPage/components/PointsHistoryTable.jsx";
import ManualAdjustmentForm from "./ManualAdjustmentForm.jsx";
import MembershipActions from "./MembershipActions.jsx";

export default function MemberSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null); // { member, history, referralsAsReferrer, referredBy }
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setSelected(null);

    const { data } = await supabase
      .from("members")
      .select("id,name,bits_id,email,whatsapp_number,referral_code")
      .or(`name.ilike.%${query.trim()}%,bits_id.ilike.%${query.trim()}%`)
      .limit(20);

    setResults(data ?? []);
    setIsSearching(false);
  };

  const loadDetail = async (member) => {
    setIsLoadingDetail(true);

    const [{ data: totals }, { data: history }, { data: asReferrer }, { data: referredBy }] =
      await Promise.all([
        supabase.from("member_totals").select("total_points").eq("member_id", member.id).single(),
        supabase
          .from("point_transactions")
          .select("event_name,achievement,source,points,reason,created_at")
          .eq("member_id", member.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("referrals")
          .select("id,status,created_at,new_member_id,members!referrals_new_member_id_fkey(name)")
          .eq("referrer_id", member.id),
        supabase
          .from("referrals")
          .select("id,status,created_at,referrer_id,members!referrals_referrer_id_fkey(name)")
          .eq("new_member_id", member.id)
          .maybeSingle(),
      ]);

    setSelected({
      member,
      totalPoints: totals?.total_points ?? 0,
      history: history ?? [],
      referralsAsReferrer: asReferrer ?? [],
      referredBy: referredBy ?? null,
    });
    setIsLoadingDetail(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or BITS ID"
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="bg-neutral-900 text-white px-6 rounded-lg border-2 border-white/20 hover:bg-neutral-800 transition flex items-center gap-2"
        >
          {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
        </button>
      </form>

      {!selected && results.length > 0 && (
        <div className="bg-black border border-gray-700 rounded-xl divide-y divide-gray-800 mb-6">
          {results.map((m) => (
            <button
              key={m.id}
              onClick={() => loadDetail(m)}
              className="w-full text-left px-4 py-3 hover:bg-gray-900 transition flex justify-between"
            >
              <span className="text-white">{m.name}</span>
              <span className="text-gray-400 text-sm">{m.bits_id}</span>
            </button>
          ))}
        </div>
      )}

      {isLoadingDetail && (
        <div className="flex items-center justify-center gap-3 text-white py-10">
          <Loader2 className="animate-spin" size={20} />
          Loading member…
        </div>
      )}

      {selected && !isLoadingDetail && (
        <div className="bg-black border border-gray-700 rounded-2xl p-6">
          <button
            onClick={() => setSelected(null)}
            className="text-gray-400 text-sm mb-4 hover:text-white"
          >
            ← Back to results
          </button>

          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{selected.member.name}</h3>
              <p className="text-gray-400 text-sm">{selected.member.bits_id}</p>
              <p className="text-gray-400 text-sm">{selected.member.email}</p>
              {selected.member.whatsapp_number && (
                <p className="text-gray-400 text-sm">WhatsApp: {selected.member.whatsapp_number}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Referral code: <span className="font-mono">{selected.member.referral_code}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Total Points</p>
              <p className="text-2xl font-bold text-white">{selected.totalPoints}</p>
            </div>
          </div>

          {selected.referredBy && (
            <p className="text-gray-400 text-sm mb-2">
              Referred by <span className="text-white">{selected.referredBy.members?.name}</span> (
              {selected.referredBy.status})
            </p>
          )}
          {selected.referralsAsReferrer.length > 0 && (
            <p className="text-gray-400 text-sm mb-4">
              Has referred {selected.referralsAsReferrer.length} member(s):{" "}
              {selected.referralsAsReferrer.map((r) => r.members?.name).join(", ")}
            </p>
          )}

          <div className="mb-6">
            <MembershipActions memberId={selected.member.id} memberName={selected.member.name} />
          </div>

          <div className="mb-6">
            <ManualAdjustmentForm
              memberId={selected.member.id}
              memberName={selected.member.name}
              onAdjusted={() => loadDetail(selected.member)}
            />
          </div>

          <h4 className="text-white font-semibold mb-2">Points History</h4>
          <PointsHistoryTable history={selected.history} />
        </div>
      )}
    </div>
  );
}
