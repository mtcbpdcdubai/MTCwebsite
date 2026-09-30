import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function ManualAdjustmentForm({ memberId, memberName, onAdjusted }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ points, reason }) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const { error: rpcError } = await supabase.rpc("admin_adjust_points", {
      p_member_id: memberId,
      p_points: Number(points),
      p_reason: reason,
    });

    setIsSubmitting(false);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    setSuccess(true);
    reset();
    onAdjusted?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3">
      <h4 className="text-white font-semibold text-sm">Manual Adjustment for {memberName}</h4>

      <div className="flex gap-3">
        <div className="flex-1">
          <input
            {...register("points", { required: "Required", validate: (v) => Number(v) !== 0 || "Cannot be zero" })}
            type="number"
            placeholder="Points (e.g. -2 or 5)"
            disabled={isSubmitting}
            className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-white/50 focus:outline-none disabled:opacity-60"
          />
          {errors.points && <p className="text-red-400 text-xs mt-1">{errors.points.message}</p>}
        </div>
      </div>

      <div>
        <textarea
          {...register("reason", { required: "A reason is required for every adjustment" })}
          rows={2}
          placeholder="Reason (required, e.g. 'Duplicate event entry')"
          disabled={isSubmitting}
          className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-white/50 focus:outline-none disabled:opacity-60 resize-none"
        />
        {errors.reason && <p className="text-red-400 text-xs mt-1">{errors.reason.message}</p>}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
      {success && <p className="text-green-400 text-xs">Adjustment recorded.</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-neutral-800 text-white text-sm font-semibold py-2 px-4 rounded-lg border border-white/20 hover:bg-neutral-700 transition disabled:opacity-60 flex items-center gap-2"
      >
        {isSubmitting && <Loader2 className="animate-spin" size={14} />}
        Apply Adjustment
      </button>
    </form>
  );
}
