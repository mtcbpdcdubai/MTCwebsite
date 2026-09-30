export default function CsvImportSummary({ result, onStartOver }) {
  return (
    <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto text-center">
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-green-400 text-xl font-semibold mb-2">Import Complete</h3>
        <p className="text-gray-300">
          {result.succeeded_rows} row(s) awarded — {result.points_awarded} total points added.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-left text-sm text-gray-300 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-gray-400">Event</p>
          <p className="text-white font-semibold">{result.event_name}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-gray-400">Total rows</p>
          <p className="text-white font-semibold">{result.total_rows}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-gray-400">Awarded</p>
          <p className="text-green-400 font-semibold">{result.succeeded_rows}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-gray-400">Failed</p>
          <p className="text-red-400 font-semibold">{result.failed_rows}</p>
        </div>
      </div>

      {result.rejectedBeforeImport?.length > 0 && (
        <div className="border border-red-500/30 rounded-xl p-4 mb-6 text-left text-sm">
          <h4 className="text-red-400 font-semibold mb-2">
            Rejected before import ({result.rejectedBeforeImport.length})
          </h4>
          <div className="text-gray-300 space-y-1 max-h-40 overflow-y-auto">
            {result.rejectedBeforeImport.map((r, idx) => (
              <p key={idx}>
                Row {r.row}: {r.reason}
              </p>
            ))}
          </div>
        </div>
      )}

      <p className="text-gray-400 text-sm mb-6">
        Emails are being sent to participants in the background — check the Import History tab
        shortly for delivery status.
      </p>

      <button
        type="button"
        onClick={onStartOver}
        className="bg-neutral-900 text-white font-semibold py-3 px-6 rounded-xl border-2 border-white/20 hover:bg-neutral-800 transition"
      >
        Upload Another CSV
      </button>
    </div>
  );
}
