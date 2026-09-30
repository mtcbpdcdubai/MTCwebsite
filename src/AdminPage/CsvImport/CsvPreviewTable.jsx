import { Loader2 } from "lucide-react";

function RowsTable({ title, rows, tone, renderReason }) {
  if (rows.length === 0) return null;
  const toneClasses = {
    ok: "border-green-500/30 text-green-400",
    warn: "border-yellow-500/30 text-yellow-400",
    bad: "border-red-500/30 text-red-400",
  }[tone];

  return (
    <div className={`border rounded-xl p-4 mb-4 ${toneClasses}`}>
      <h4 className="font-semibold mb-2">
        {title} ({rows.length})
      </h4>
      <div className="max-h-48 overflow-y-auto text-sm text-gray-300 space-y-1">
        {rows.map((r, idx) => (
          <div key={idx} className="flex justify-between gap-4">
            <span>
              Row {r.row ?? "—"}: {r.name ?? r.data?.["Name"] ?? r.bits_id ?? "?"}
            </span>
            <span className="text-gray-400">{renderReason(r)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CsvPreviewTable({ preview, onConfirm, onCancel, isImporting }) {
  const { summary, readyToImport, invalid, duplicateInFile, alreadyImported } = preview;

  return (
    <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Review Before Import</h2>

      <p className="text-gray-300 mb-6">
        {summary.total} rows read — <span className="text-green-400">{summary.valid} will be imported</span>,{" "}
        <span className="text-yellow-400">{summary.alreadyImported} already imported</span>,{" "}
        <span className="text-red-400">{summary.invalid} invalid</span>
        {summary.duplicateInFile > 0 && `, ${summary.duplicateInFile} duplicate rows in file`}.
      </p>

      <RowsTable
        title="Will be imported"
        rows={readyToImport}
        tone="ok"
        renderReason={(r) => `${r.event_name} — ${r.achievement}`}
      />
      <RowsTable
        title="Already imported (skipped)"
        rows={alreadyImported}
        tone="warn"
        renderReason={(r) => r.reason}
      />
      <RowsTable
        title="Duplicate rows in this file (skipped)"
        rows={duplicateInFile}
        tone="warn"
        renderReason={(r) => r.reason}
      />
      <RowsTable title="Invalid" rows={invalid} tone="bad" renderReason={(r) => r.reason} />

      <div className="flex gap-4 justify-end mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isImporting}
          className="px-6 py-3 rounded-xl border-2 border-gray-700 text-gray-300 hover:bg-gray-900 transition disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isImporting || readyToImport.length === 0}
          className="px-6 py-3 rounded-xl border-2 border-white/20 bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition disabled:opacity-60 inline-flex items-center gap-2"
        >
          {isImporting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Importing…
            </>
          ) : (
            `Confirm Import (${readyToImport.length})`
          )}
        </button>
      </div>
    </div>
  );
}
