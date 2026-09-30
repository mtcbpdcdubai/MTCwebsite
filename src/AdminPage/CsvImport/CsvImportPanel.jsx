import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import CsvUploadForm from "./CsvUploadForm";
import ManualEntryForm from "./ManualEntryForm";
import CsvPreviewTable from "./CsvPreviewTable";
import CsvImportSummary from "./CsvImportSummary";

// Steps: csv/manual (entry) -> validating -> preview -> importing -> summary.
// Manual entry builds the exact same {name, bits_id, email, result, event}
// row shape as a parsed CSV, so both paths feed the same
// csv-validate/csv-import pipeline unchanged.
export default function CsvImportPanel() {
  const [entryMode, setEntryMode] = useState("csv"); // 'csv' | 'manual' -- remembered so a validation error returns to the right entry screen
  const [step, setStep] = useState("csv");
  const [rows, setRows] = useState(null);
  const [filename, setFilename] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const reset = () => {
    setStep(entryMode);
    setRows(null);
    setFilename(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const handleParsed = async (parsedRows, name) => {
    setRows(parsedRows);
    setFilename(name);
    setError(null);
    setStep("validating");

    const { data, error: fnError } = await supabase.functions.invoke("csv-validate", {
      body: { rows: parsedRows },
    });

    if (fnError || data?.error) {
      setError(fnError?.message ?? data?.error ?? "Validation failed");
      setStep(entryMode);
      return;
    }

    setPreview(data);
    setStep("preview");
  };

  const handleConfirm = async () => {
    setStep("importing");
    setError(null);

    const { data, error: fnError } = await supabase.functions.invoke("csv-import", {
      body: { rows, filename },
    });

    if (fnError || data?.error) {
      setError(fnError?.message ?? data?.error ?? "Import failed");
      setStep("preview");
      return;
    }

    setResult(data);
    setStep("summary");
  };

  return (
    <div>
      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {(step === "csv" || step === "manual") && (
        <div className="flex gap-2 justify-center mb-6">
          <button
            type="button"
            onClick={() => {
              setEntryMode("csv");
              setStep("csv");
            }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              entryMode === "csv"
                ? "bg-white text-black"
                : "bg-black border border-gray-700 text-white hover:border-white/50"
            }`}
          >
            Upload CSV
          </button>
          <button
            type="button"
            onClick={() => {
              setEntryMode("manual");
              setStep("manual");
            }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              entryMode === "manual"
                ? "bg-white text-black"
                : "bg-black border border-gray-700 text-white hover:border-white/50"
            }`}
          >
            Manual Entry
          </button>
        </div>
      )}

      {step === "csv" && <CsvUploadForm onParsed={handleParsed} />}
      {step === "manual" && (
        <ManualEntryForm onSubmitRows={(rows) => handleParsed(rows, "Manual Entry")} />
      )}

      {step === "validating" && (
        <div className="flex items-center justify-center gap-3 text-white py-16">
          <Loader2 className="animate-spin" size={22} />
          Validating CSV…
        </div>
      )}

      {step === "preview" && preview && (
        <CsvPreviewTable
          preview={preview}
          onConfirm={handleConfirm}
          onCancel={reset}
          isImporting={false}
        />
      )}

      {step === "importing" && (
        <div className="flex items-center justify-center gap-3 text-white py-16">
          <Loader2 className="animate-spin" size={22} />
          Importing and awarding points…
        </div>
      )}

      {step === "summary" && result && <CsvImportSummary result={result} onStartOver={reset} />}
    </div>
  );
}
