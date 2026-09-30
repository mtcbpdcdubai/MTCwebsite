import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import BlurText from "../components/ui/BlurText.jsx";
import Balatro from "../components/ui/Balatro.jsx";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("password"); // 'password' | 'magic-link'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitPassword = async ({ email, password }) => {
    setIsSubmitting(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    setIsSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    navigate("/admin");
  };

  const onSubmitMagicLink = async ({ email }) => {
    setIsSubmitting(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });

    setIsSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    setSent(true);
  };

  return (
    <div className="bg-transparent text-white min-h-screen flex flex-col items-center justify-center px-4 relative">
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

      <section className="w-full max-w-md mx-auto flex flex-col items-center text-center mb-8">
        <BlurText text="Admin Login" className="text-4xl font-semibold mb-4" delay={100} />
      </section>

      <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-md w-full">
        {sent ? (
          <div className="text-center">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-green-400 font-semibold mb-2">Check your email</h3>
              <p className="text-gray-300 text-sm">
                We sent a sign-in link to your email. Click it to access the admin dashboard.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setMode("password")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                  mode === "password"
                    ? "bg-white text-black"
                    : "bg-black border border-gray-700 text-white hover:border-white/50"
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => setMode("magic-link")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                  mode === "magic-link"
                    ? "bg-white text-black"
                    : "bg-black border border-gray-700 text-white hover:border-white/50"
                }`}
              >
                Magic Link
              </button>
            </div>

            <form
              onSubmit={handleSubmit(mode === "password" ? onSubmitPassword : onSubmitMagicLink)}
              className="space-y-5"
            >
              <div>
                <label className="block text-white font-medium mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Admin Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                  placeholder="you@dubai.bits-pilani.ac.in"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {mode === "password" && (
                <div>
                  <label className="block text-white font-medium mb-2">
                    <Lock size={16} className="inline mr-2" />
                    Password
                  </label>
                  <input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
              )}

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 text-white font-semibold py-3 px-6 rounded-xl border-2 border-white/20 hover:bg-neutral-800 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : mode === "password" ? (
                  "Sign In"
                ) : (
                  "Send Sign-In Link"
                )}
              </button>

              {mode === "password" && (
                <p className="text-gray-500 text-xs text-center">
                  Haven't set a password yet? Use Magic Link once, then set one from the Account
                  tab in the dashboard.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
