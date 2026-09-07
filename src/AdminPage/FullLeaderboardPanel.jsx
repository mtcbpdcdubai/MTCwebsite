import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function FullLeaderboardPanel() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("leaderboard")
        .select("rank,name,total_points")
        .order("rank", { ascending: true })
        .order("first_scored_at", { ascending: true });
      setRows(data ?? []);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 text-white py-10">
        <Loader2 className="animate-spin" size={20} />
        Loading rankings…
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-black border border-gray-700 rounded-xl overflow-hidden">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className={`flex justify-between px-4 py-3 ${idx !== rows.length - 1 ? "border-b border-gray-800" : ""}`}
        >
          <span className="text-white">
            #{row.rank} {row.name}
          </span>
          <span className="text-gray-300">{row.total_points} pts</span>
        </div>
      ))}
      {rows.length === 0 && <p className="text-gray-400 text-center py-10">No members yet.</p>}
    </div>
  );
}
