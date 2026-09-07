import { useEffect, useState } from "react";
import { Trophy, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import BlurText from "../components/ui/BlurText.jsx";
import LinkButton from "../components/ui/LinkButton.jsx";
import Balatro from "../components/ui/Balatro.jsx";

const MEDALS = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [rewardsTopN, setRewardsTopN] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [{ data: leaderboardRows, error: leaderboardError }, { data: settingsRow }] =
        await Promise.all([
          supabase
            .from("leaderboard")
            .select("rank,name,total_points")
            .order("rank", { ascending: true })
            .order("first_scored_at", { ascending: true })
            .limit(20),
          supabase.from("settings").select("value").eq("key", "rewards_top_n").single(),
        ]);

      if (cancelled) return;

      if (leaderboardError) {
        setError("Could not load the leaderboard right now. Please try again later.");
      } else {
        setRows(leaderboardRows ?? []);
      }
      if (settingsRow?.value != null) {
        setRewardsTopN(settingsRow.value);
      }
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-transparent text-white min-h-screen py-20 px-4 relative">
      <div className="fixed inset-0 -z-10">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
          color1="#000000"
          color2="#0a0a0a"
          color3="#111111"
        />
      </div>

      <section className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-10">
        <BlurText
          text="MTC Leaderboard"
          className="text-4xl md:text-6xl font-semibold mb-4"
          delay={100}
        />
        <BlurText
          text="Top members ranked by points earned through events and referrals."
          className="text-lg md:text-xl font-normal max-w-2xl leading-[1.4] p-3 text-gray-300"
          delay={150}
        />
        {rewardsTopN != null && (
          <p className="text-sm text-gray-400 mt-2">
            Top {rewardsTopN} members earn MTC rewards this cycle.
          </p>
        )}
      </section>

      <div className="max-w-2xl mx-auto">
        {isLoading && (
          <div className="flex items-center justify-center gap-3 text-white py-16">
            <Loader2 className="animate-spin" size={22} />
            Loading leaderboard…
          </div>
        )}

        {error && <p className="text-red-400 text-center">{error}</p>}

        {!isLoading && !error && rows.length === 0 && (
          <p className="text-gray-400 text-center py-16">
            No points have been awarded yet — check back after the next event!
          </p>
        )}

        {!isLoading && rows.length > 0 && (
          <div className="bg-black/60 border border-gray-700 rounded-2xl overflow-hidden">
            {rows.map((row, idx) => (
              <div
                key={`${row.rank}-${row.name}-${idx}`}
                className={`flex items-center justify-between px-6 py-4 ${
                  idx !== rows.length - 1 ? "border-b border-gray-800" : ""
                } ${row.rank <= 3 ? "bg-white/5" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 text-lg font-bold text-gray-400">
                    {MEDALS[row.rank] ?? row.rank}
                  </span>
                  <span className="text-white font-medium">{row.name}</span>
                </div>
                <span className="text-white font-semibold">{row.total_points} pts</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <LinkButton
            to="/leaderboard/my-points"
            className="bg-white text-black px-8 py-3 rounded-lg text-lg transition hover:bg-black hover:text-white hover:scale-105 inline-flex items-center gap-2"
          >
            <Trophy size={18} />
            Check Your Points
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
