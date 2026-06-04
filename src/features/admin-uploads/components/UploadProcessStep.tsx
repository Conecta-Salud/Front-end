import { AlertTriangle, Play } from "lucide-react";
import { useState } from "react";
import { useProcessUploadBatchMutation } from "../mutations/adminUploads.mutations";
import type {
  ProcessingMode,
  UploadBatchDetail,
} from "../types/adminUploads.types";
import {
  getUploadError,
  processingModeLabels,
  uploadStatusClassNames,
  uploadStatusLabels,
} from "./adminUploadsView.helpers";

type UploadProcessStepProps = {
  detail?: UploadBatchDetail;
};

const processingModeOptions: ProcessingMode[] = [
  "upsert",
  "replace",
  "validate_only",
];

export default function UploadProcessStep({ detail }: UploadProcessStepProps) {
  const batch = detail?.batch;
  const files = detail?.files ?? [];
  const [modeOverride, setModeOverride] = useState<ProcessingMode | null>(null);
  const [replaceExistingForYear, setReplaceExistingForYear] = useState(false);
  const [failOnErrors, setFailOnErrors] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [processMessage, setProcessMessage] = useState<string | null>(null);
  const processMutation = useProcessUploadBatchMutation();
  const hasFiles = files.length > 0;
  const hasFilesWithWarnings = files.some((file) => file.status !== "completed");
  const mode = modeOverride ?? batch?.processingMode ?? "upsert";
  const requestError = processMutation.isError
    ? getUploadError(processMutation.error)
    : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setProcessMessage(null);
    processMutation.reset();

    if (!batch) {
      setFormError("Crea un batch antes de procesar.");
      return;
    }

    if (!hasFiles) {
      setFormError("Sube al menos un archivo antes de procesar.");
      return;
    }

    try {
      const response = await processMutation.mutateAsync({
        batchId: batch.id,
        request: {
          mode,
          replaceExistingForYear,
          failOnErrors,
        },
      });
      setProcessMessage(response.message);
    } catch {
      // El mensaje controlado se muestra debajo del formulario.
    }
  };

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <Play className="mt-1 h-5 w-5 text-emerald-600" aria-hidden="true" />
        <div>
          <h2 className="text-[20px] font-semibold text-black">
            4. Procesar batch
          </h2>
          <p className="text-[15px] text-gray-500">
            Procesa los archivos validados con el modo adecuado.
          </p>
        </div>
      </div>

      {hasFilesWithWarnings && (
        <div className="mb-4 flex items-start gap-2 rounded-[8px] bg-amber-50 p-3 text-[14px] text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4" aria-hidden="true" />
          <p>
            Hay archivos con estado distinto de completado. Puedes procesar si
            corresponde, pero revisa la validación antes de continuar.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Modo de procesamiento
            <select
              value={mode}
              disabled={!batch}
              onChange={(event) =>
                setModeOverride(event.target.value as ProcessingMode)
              }
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processingModeOptions.map((option) => (
                <option key={option} value={option}>
                  {processingModeLabels[option]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3 rounded-[8px] border border-gray-200 px-3 py-2 text-[14px] font-semibold text-black">
            <input
              type="checkbox"
              checked={replaceExistingForYear}
              disabled={!batch}
              onChange={(event) =>
                setReplaceExistingForYear(event.target.checked)
              }
              className="h-4 w-4 accent-emerald-600 disabled:cursor-not-allowed"
            />
            Reemplazar registros del año
          </label>

          <label className="flex items-center gap-3 rounded-[8px] border border-gray-200 px-3 py-2 text-[14px] font-semibold text-black">
            <input
              type="checkbox"
              checked={failOnErrors}
              disabled={!batch}
              onChange={(event) => setFailOnErrors(event.target.checked)}
              className="h-4 w-4 accent-emerald-600 disabled:cursor-not-allowed"
            />
            Detener si hay errores
          </label>
        </div>

        {batch && (
          <div className="flex flex-wrap gap-2 text-[13px] text-gray-600">
            <span
              className={[
                "rounded-full px-2 py-1 font-semibold",
                uploadStatusClassNames[batch.status],
              ].join(" ")}
            >
              Batch: {uploadStatusLabels[batch.status]}
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-1 font-semibold text-gray-700">
              Archivos: {files.length}/{batch.expectedFiles}
            </span>
          </div>
        )}

        {(formError || requestError) && (
          <div className="rounded-[8px] bg-red-50 p-3 text-[14px] text-red-700">
            <p>{formError ?? requestError?.message}</p>
            {requestError?.detail && (
              <p className="mt-1 text-[13px] text-red-600">
                {requestError.detail}
              </p>
            )}
          </div>
        )}

        {processMessage && (
          <p className="rounded-[8px] bg-emerald-50 p-3 text-[14px] text-emerald-700">
            {processMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={!batch || !hasFiles || processMutation.isPending}
          className="inline-flex h-[42px] w-fit items-center gap-2 rounded-[6px] px-4 text-[15px] font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "var(--gradient-primary-green)" }}
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          {processMutation.isPending ? "Procesando..." : "Procesar batch"}
        </button>
      </form>
    </section>
  );
}
