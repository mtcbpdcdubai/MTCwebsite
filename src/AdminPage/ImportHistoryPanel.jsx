import { useEffect, useState } from "react";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function ImportHistoryPanel() {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [emailLogByBatch, setEmailLogByBatch] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("import_batches")
        .select("id,event_name,status,total_rows,succeeded_rows,failed_rows,points_awarded,created_at,original_filename")
        .order("created_at", { ascending: false });
      setBatches(data ?? []);
      setIsLoading(false);
    })();
  }, []);

  const toggleExpand = async (batchId) => {
    if (expandedId === batchId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(batchId);
    if (!emailLogByBatch[batchId]) {
      const { data } = await supabase
        .from("email_log")
        .select("status")
        .eq("import_batch_id", batchId);
      const sent = (data ?? []).filter((e) => e.status === "sent").length;
      const failed = (data ?? []).filter((e) => e.status === "failed").length;
      setEmailLogByBatch((prev) => ({ ...prev, [batchId]: { sent, failed, total: (data ?? []).length } }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 text-white py-10">
        <Loader2 className="animate-spin" size={20} />
        Loading import history…
      </div>
    );
  }

  if (batches.length === 0) {
    return <p className="text-gray-400 text-center py-10">No CSV imports yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {batches.map((b) => {
        const emailStatus = emailLogByBatch[b.id];
        const isExpanded = expandedId === b.id;
        return (
          <div key={b.id} className="bg-black border border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleExpand(b.id)}
              className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-900 transition"
            >
              <div className="text-left">
                <p className="text-white font-medium">{b.event_name}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(b.created_at).toLocaleString()} — {b.original_filename ?? "unnamed file"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-400 text-sm">{b.succeeded_rows} awarded</span>
                {b.failed_rows > 0 && <span className="text-red-400 text-sm">{b.failed_rows} failed</span>}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>
            {isExpanded && (
              <div className="px-4 py-3 border-t border-gray-800 text-sm text-gray-300 space-y-1">
                <p>Total rows: {b.total_rows}</p>
                <p>Points awarded: {b.points_awarded}</p>
                <p>Status: {b.status}</p>
                <p>
                  Email status:{" "}
                  {emailStatus
                    ? `${emailStatus.sent} sent, ${emailStatus.failed} failed (${emailStatus.total} total)`
                    : "loading…"}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
