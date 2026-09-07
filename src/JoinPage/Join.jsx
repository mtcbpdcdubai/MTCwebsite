import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Send, Copy } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import BlurText from "../components/ui/BlurText.jsx";
import Balatro from "../components/ui/Balatro.jsx";

export default function Join() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [referralStatus, setReferralStatus] = useState(null); // 'valid' | 'invalid' | null
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const referralCode = watch("referralCode");

  const checkReferralCode = async () => {
    const code = (referralCode ?? "").trim();
    if (!code) {
      setReferralStatus(null);
      return;
    }
    const { data, error } = await supabase.rpc("referral_code_is_valid", { p_code: code });
    if (error) {
      setReferralStatus(null);
      return;
    }
    setReferralStatus(data ? "valid" : "invalid");
  };

  const onSubmit = async ({ name, bitsId, email, whatsappNumber, membershipType, referralCode: code }) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const { data, error } = await supabase.functions.invoke("register-member", {
      body: { name, bitsId, email, whatsappNumber, membershipType, referralCode: code || null },
    });

    setIsSubmitting(false);

    if (error || data?.error) {
      setSubmitError(data?.error ?? error?.message ?? "Registration failed. Please try again.");
      return;
    }

    setResult(data);
  };

  const copyReferralCode = () => {
    if (!result?.referral_code) return;
    navigator.clipboard.writeText(result.referral_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <BlurText text="Join MTC" className="text-4xl md:text-6xl font-semibold mb-4" delay={100} />
        <BlurText
          text="Become a member of the Microsoft Tech Club, BITS Pilani Dubai Campus."
          className="text-lg md:text-xl font-normal max-w-2xl leading-[1.4] p-3 text-gray-300"
          delay={150}
        />
      </section>

      <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-xl mx-auto">
        {result ? (
          <div className="text-center py-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-green-400 text-xl font-semibold mb-2">Thanks, {result.name}! 🎉</h3>
              <p className="text-gray-300 text-sm">
                Your registration is recorded. Your membership will be activated once your
                payment is confirmed by an admin.
              </p>
              {result.referral_applied && (
                <p className="text-gray-300 text-sm mt-2">
                  Your referral code was applied — you and your referrer will each get +2 points
                  once your membership is confirmed.
                </p>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-2">Your referral code — share it with friends:</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-mono font-bold text-white bg-gray-900 border border-gray-700 rounded-lg px-4 py-2">
                {result.referral_code}
              </span>
              <button
                type="button"
                onClick={copyReferralCode}
                className="p-3 rounded-lg border-2 border-white/20 hover:bg-neutral-800 transition"
                aria-label="Copy referral code"
              >
                <Copy size={18} />
              </button>
            </div>
            {copied && <p className="text-green-400 text-xs mt-2">Copied!</p>}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-white font-medium mb-2">Full Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                disabled={isSubmitting}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">BITS ID</label>
              <input
                {...register("bitsId", { required: "BITS ID is required" })}
                type="text"
                disabled={isSubmitting}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white uppercase focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="e.g. 2024A7PS0001U"
              />
              {errors.bitsId && <p className="text-red-400 text-sm mt-1">{errors.bitsId.message}</p>}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
                })}
                type="email"
                disabled={isSubmitting}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">WhatsApp Number</label>
              <input
                {...register("whatsappNumber", { required: "WhatsApp number is required" })}
                type="tel"
                disabled={isSubmitting}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="e.g. +971 50 123 4567"
              />
              {errors.whatsappNumber && (
                <p className="text-red-400 text-sm mt-1">{errors.whatsappNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Pick a plan!</label>
              <div className="flex gap-4">
                {[
                  { value: "LIFETIME", label: "Life time" },
                  { value: "SEMESTER", label: "Individual" },
                ].map((plan) => (
                  <label
                    key={plan.value}
                    className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 flex-1 cursor-pointer has-[:checked]:border-white/50"
                  >
                    <input
                      {...register("membershipType", { required: "Please pick a plan" })}
                      type="radio"
                      value={plan.value}
                      disabled={isSubmitting}
                      className="accent-white"
                    />
                    <span className="text-white">{plan.label}</span>
                  </label>
                ))}
              </div>
              {errors.membershipType && (
                <p className="text-red-400 text-sm mt-1">{errors.membershipType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Were you referred by an MTC member? (Optional)
              </label>
              <input
                {...register("referralCode")}
                type="text"
                disabled={isSubmitting}
                onBlur={checkReferralCode}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white uppercase focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                placeholder="Referral code"
              />
              {referralStatus === "valid" && (
                <p className="text-green-400 text-sm mt-1">Referral code applied successfully.</p>
              )}
              {referralStatus === "invalid" && (
                <p className="text-red-400 text-sm mt-1">Invalid referral code.</p>
              )}
            </div>

            {submitError && <p className="text-red-400 text-sm">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-neutral-900 text-white font-semibold py-4 px-6 rounded-xl border-2 border-white/20 hover:bg-neutral-800 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Joining…
                </>
              ) : (
                <>
                  <Send size={20} />
                  Join MTC
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
