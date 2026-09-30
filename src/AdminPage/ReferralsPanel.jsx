import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const STATUS_COLORS = {
  Completed: "text-green-400",
  Pending: "text-yellow-400",
  Rejected: "text-red-400",
};

export default function ReferralsPanel() {
  const [referrals, setReferrals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("referrals")
        .select(
          "id,status,created_at,completed_at,referrer:members!referrals_referrer_id_fkey(name,bits_id),new_member:members!referrals_new_member_id_fkey(name,bits_id)"
        )
        .order("created_at", { ascending: false });
      setReferrals(data ?? []);
      setIsLoading(false);
    })();
  }, []);

  const filtered = filter === "all" ? referrals : referrals.filter((r) => r.status === filter);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-2 mb-6">
        {["all", "Completed", "Pending", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              filter === status
                ? "bg-white text-black border-white"
                : "bg-black text-white border-gray-700 hover:border-white/50"
            }`}
          >
            {status === "all" ? "All" : status}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-3 text-white py-10">
          <Loader2 className="animate-spin" size={20} />
          Loading referrals…
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <p className="text-gray-400 text-center py-10">No referrals in this category.</p>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="bg-black border border-gray-700 rounded-xl divide-y divide-gray-800">
          {filtered.map((r) => (
            <div key={r.id} className="px-4 py-3 flex justify-between items-center">
              <div>
                <p className="text-white text-sm">
                  {r.referrer?.name} → {r.new_member?.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-sm font-semibold ${STATUS_COLORS[r.status] ?? "text-gray-400"}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
