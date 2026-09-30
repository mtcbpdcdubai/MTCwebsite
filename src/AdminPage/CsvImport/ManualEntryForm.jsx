import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2, ArrowRight } from "lucide-react";

const RESULT_OPTIONS = [
  "Participant",
  "1st Place",
  "2nd Place",
  "3rd Place",
  "Special Award",
  "Best Idea",
  "Best Performer",
  "Special Mention",
];

// Produces the same {name, bits_id, result, event} row shape as the CSV
// upload path, so it can feed straight into the existing
// csv-validate/csv-import pipeline unchanged.
export default function ManualEntryForm({ onSubmitRows }) {
  const [rows, setRows] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addRow = (data) => {
    setRows((prev) => [...prev, data]);
    reset();
  };

  const removeRow = (idx) => {
    setRows((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">Manual Entry</h2>
      <p className="text-gray-400 text-sm mb-6 text-center">
        Add one or more results by hand, then review and import — same validation as a CSV
        upload.
      </p>

      <form onSubmit={handleSubmit(addRow)} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">Name</label>
            <input
              {...register("name", { required: "Required" })}
              type="text"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-white/50 focus:outline-none"
              placeholder="Full name"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">BITS ID</label>
            <input
              {...register("bits_id", { required: "Required" })}
              type="text"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm uppercase focus:border-white/50 focus:outline-none"
              placeholder="e.g. 2024A7PS0001U"
            />
            {errors.bits_id && (
              <p className="text-red-400 text-xs mt-1">{errors.bits_id.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Result</label>
            <select
              {...register("result", { required: "Required" })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-white/50 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select a result
              </option>
              {RESULT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.result && (
              <p className="text-red-400 text-xs mt-1">{errors.result.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-white text-sm font-medium mb-1">Event</label>
            <input
              {...register("event", { required: "Required" })}
              type="text"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-white/50 focus:outline-none"
              placeholder="e.g. AI Workshop"
            />
            {errors.event && (
              <p className="text-red-400 text-xs mt-1">{errors.event.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-neutral-900 text-white font-semibold py-2.5 rounded-lg border-2 border-white/20 hover:bg-neutral-800 transition flex items-center justify-center gap-2 text-sm"
        >
          <Plus size={16} />
          Add Row
        </button>
      </form>

      {rows.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold text-sm mb-2">
            Rows to import ({rows.length})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {rows.map((row, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm"
              >
                <span className="text-white">
                  {row.name}{" "}
                  <span className="text-gray-500">
                    ({row.bits_id}) — {row.result} — {row.event}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeRow(idx)}
                  aria-label={`Remove ${row.name}`}
                  className="text-gray-500 hover:text-red-400 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        disabled={rows.length === 0}
        onClick={() => onSubmitRows(rows)}
        className="w-full bg-white text-black font-semibold py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] flex items-center justify-center gap-2"
      >
        Review {rows.length > 0 ? `${rows.length} Row${rows.length > 1 ? "s" : ""}` : ""}
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
