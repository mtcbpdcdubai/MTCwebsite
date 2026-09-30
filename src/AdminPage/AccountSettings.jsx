import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AccountSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async ({ password: newPassword }) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    setIsSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    reset();
  };

  return (
    <div className="max-w-md mx-auto bg-black border border-gray-700 rounded-2xl p-8">
      <h3 className="text-xl font-bold text-white mb-2">Set / Update Password</h3>
      <p className="text-gray-400 text-sm mb-6">
        Set a password once so you can sign in directly next time instead of using a magic link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">
            <Lock size={16} className="inline mr-2" />
            New Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
            })}
            type="password"
            disabled={isSubmitting}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
            placeholder="At least 8 characters"
          />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (v) => v === password || "Passwords do not match",
            })}
            type="password"
            disabled={isSubmitting}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none transition-colors disabled:opacity-60"
            placeholder="Re-enter password"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">Password updated successfully.</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-neutral-900 text-white font-semibold py-3 px-6 rounded-xl border-2 border-white/20 hover:bg-neutral-800 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={18} />}
          Update Password
        </button>
      </form>
    </div>
  );
}
