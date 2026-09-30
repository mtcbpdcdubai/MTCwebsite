import { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, Loader2, Copy } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import BlurText from "../components/ui/BlurText.jsx";
import Balatro from "../components/ui/Balatro.jsx";
import PointsHistoryTable from "./components/PointsHistoryTable.jsx";

export default function MyPoints() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { found, name, referral_code, total_points, rank, history }
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyReferralCode = () => {
    if (!result?.referral_code) return;
    navigator.clipboard.writeText(result.referral_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ bitsId }) => {
    setIsSubmitting(true);
    setNotFound(false);
    setResult(null);

    const { data, error } = await supabase.rpc("lookup_member_by_bits_id", {
      p_bits_id: bitsId,
    });

    setIsSubmitting(false);

    if (error) {
      alert("Something went wrong looking up your points. Please try again.\n\n" + error.message);
      return;
    }

    if (!data?.found) {
      setNotFound(true);
      return;
    }

    setResult(data);
  };

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

      <section className="w-full max-w-2xl mx-auto flex flex-col items-center text-center mb-10">
        <BlurText
          text="Check Your Points"
          className="text-4xl md:text-6xl font-semibold mb-4"
          delay={100}
        />
        <BlurText
          text="Enter your BITS ID to see your total points, rank, and history."
          className="text-lg md:text-xl font-normal max-w-2xl leading-[1.4] p-3 text-gray-300"
          delay={150}
        />
      </section>

      <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-2">
          <input
            {...register("bitsId", { required: "Please enter your BITS ID" })}
            type="text"
            disabled={isSubmitting}
            placeholder="e.g. 2024A7PS0001U"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white uppercase focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-neutral-900 text-white font-semibold px-6 rounded-lg border-2 border-white/20 hover:bg-neutral-800 transition disabled:opacity-60 flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
          </button>
        </form>
        {errors.bitsId && <p className="text-red-400 text-sm">{errors.bitsId.message}</p>}

        {notFound && (
          <p className="text-yellow-400 text-sm mt-4 text-center">
            No member found with that BITS ID. Double-check it and try again.
          </p>
        )}

        {result && (
          <div className="mt-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white">{result.name}</h3>
              <div className="flex justify-center gap-8 mt-3">
                <div>
                  <p className="text-gray-400 text-sm">Total Points</p>
                  <p className="text-3xl font-bold text-white">{result.total_points}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Current Rank</p>
                  <p className="text-3xl font-bold text-white">#{result.rank}</p>
                </div>
              </div>
            </div>

            {result.referral_code && (
              <div className="mb-6 text-center">
                <p className="text-gray-400 text-sm mb-2">
                  Your referral code — share it to earn +2 points per new member:
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl font-mono font-bold text-white bg-gray-900 border border-gray-700 rounded-lg px-4 py-2">
                    {result.referral_code}
                  </span>
                  <button
                    type="button"
                    onClick={copyReferralCode}
                    className="p-2.5 rounded-lg border-2 border-white/20 hover:bg-neutral-800 transition"
                    aria-label="Copy referral code"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                {copied && <p className="text-green-400 text-xs mt-2">Copied!</p>}
              </div>
            )}

            <h4 className="text-white font-semibold mb-2">Points History</h4>
            <PointsHistoryTable history={result.history} />
          </div>
        )}
      </div>
    </div>
  );
}
