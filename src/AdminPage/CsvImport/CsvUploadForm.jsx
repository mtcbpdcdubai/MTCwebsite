import { useRef, useState } from "react";
import Papa from "papaparse";
import { Upload, Loader2 } from "lucide-react";

// Client-side parsing is UX-only -- csv-validate/csv-import re-check
// everything server-side and never trust this step.
const EXPECTED_HEADERS = ["Name", "BITS ID", "Result", "Event"];

export default function CsvUploadForm({ onParsed }) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    setError(null);
    setIsParsing(true);
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setIsParsing(false);
        const headers = results.meta.fields ?? [];
        const missingHeaders = EXPECTED_HEADERS.filter((h) => !headers.includes(h));
        if (missingHeaders.length > 0) {
          setError(`Missing column(s) in CSV: ${missingHeaders.join(", ")}`);
          return;
        }

        const rows = results.data.map((row) => ({
          name: row["Name"] ?? "",
          bits_id: row["BITS ID"] ?? "",
          result: row["Result"] ?? "",
          event: row["Event"] ?? "",
        }));

        onParsed(rows, file.name);
      },
      error: (err) => {
        setIsParsing(false);
        setError(`Could not read CSV: ${err.message}`);
      },
    });
  };

  return (
    <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full border-2 border-white/20 bg-neutral-900">
          <Upload className="text-white" size={32} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Upload Event Results CSV</h2>
      <p className="text-gray-400 text-sm mb-6">
        Columns required: Name, BITS ID, Result, Event. The member must already be registered
        (via /join) -- unrecognized BITS IDs are flagged as invalid, not created.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <button
        type="button"
        disabled={isParsing}
        onClick={() => inputRef.current?.click()}
        className="bg-neutral-900 text-white font-semibold py-3 px-6 rounded-xl border-2 border-white/20 hover:bg-neutral-800 transition-all disabled:opacity-60 inline-flex items-center gap-2"
      >
        {isParsing ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Reading {fileName}…
          </>
        ) : (
          "Choose CSV File"
        )}
      </button>

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </div>
  );
}
