import { Check, Database } from "lucide-react";
import { useMemo, useState } from "react";
import { useCreateUploadBatchMutation } from "../mutations/adminUploads.mutations";
import type {
  CreateUploadBatchRequest,
  ProcessingMode,
  UploadBatchSummary,
  UploadSourceType,
} from "../types/adminUploads.types";
import {
  getUploadError,
  processingModeLabels,
  sourceTypeLabels,
  uploadPresets,
} from "./adminUploadsView.helpers";

type UploadBatchCreatorProps = Readonly<{
  onBatchCreated: (batch: UploadBatchSummary) => void;
}>;

type BatchFormState = {
  sourceType: UploadSourceType;
  dataSourceCode: string;
  sourceYear: string;
  analysisYear: string;
  expectedFiles: string;
  batchVersion: string;
  processingMode: ProcessingMode;
};

const sourceTypeOptions: UploadSourceType[] = [
  "population",
  "health_establishments",
  "health_sectorial",
];

const processingModeOptions: ProcessingMode[] = [
  "upsert",
  "replace",
  "validate_only",
];

function buildFormState(request: CreateUploadBatchRequest): BatchFormState {
  return {
    sourceType: request.sourceType,
    dataSourceCode: request.dataSourceCode,
    sourceYear: String(request.sourceYear),
    analysisYear:
      request.analysisYear === null || request.analysisYear === undefined
        ? ""
        : String(request.analysisYear),
    expectedFiles: String(request.expectedFiles),
    batchVersion: request.batchVersion,
    processingMode: request.processingMode,
  };
}

function validateBatchForm(form: BatchFormState) {
  if (!form.sourceType) return "Selecciona el tipo de fuente.";
  if (!form.dataSourceCode.trim()) return "Captura el código de fuente.";
  if (!Number.isFinite(Number(form.sourceYear))) {
    return "Captura un año fuente válido.";
  }
  if (Number(form.expectedFiles) < 1) {
    return "El número de archivos esperados debe ser al menos 1.";
  }
  if (!form.batchVersion.trim()) return "Captura la versión del batch.";
  if (!form.processingMode) return "Selecciona el modo de procesamiento.";

  return null;
}

function buildRequest(form: BatchFormState): CreateUploadBatchRequest {
  return {
    sourceType: form.sourceType,
    dataSourceCode: form.dataSourceCode.trim(),
    sourceYear: Number(form.sourceYear),
    analysisYear: form.analysisYear ? Number(form.analysisYear) : null,
    expectedFiles: Number(form.expectedFiles),
    batchVersion: form.batchVersion.trim(),
    processingMode: form.processingMode,
  };
}

export default function UploadBatchCreator({
  onBatchCreated,
}: UploadBatchCreatorProps) {
  const [selectedPresetId, setSelectedPresetId] = useState(uploadPresets[1].id);
  const [form, setForm] = useState<BatchFormState>(
    buildFormState(uploadPresets[1].request)
  );
  const [formError, setFormError] = useState<string | null>(null);
  const createBatchMutation = useCreateUploadBatchMutation();

  const selectedPreset = useMemo(
    () => uploadPresets.find((preset) => preset.id === selectedPresetId),
    [selectedPresetId]
  );

  const requestError = createBatchMutation.isError
    ? getUploadError(createBatchMutation.error)
    : null;

  const updateForm = <K extends keyof BatchFormState>(
    key: K,
    value: BatchFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFormError(null);
    createBatchMutation.reset();
  };

  const handlePresetChange = (presetId: string) => {
    const preset = uploadPresets.find((item) => item.id === presetId);
    if (!preset) return;

    setSelectedPresetId(preset.id);
    setForm(buildFormState(preset.request));
    setFormError(null);
    createBatchMutation.reset();
  };

  const handleSourceTypeChange = (sourceType: UploadSourceType) => {
    const preset = uploadPresets.find(
      (item) => item.request.sourceType === sourceType
    );

    if (preset) {
      setSelectedPresetId(preset.id);
    }

    updateForm("sourceType", sourceType);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateBatchForm(form);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      const batch = await createBatchMutation.mutateAsync(buildRequest(form));
      onBatchCreated(batch);
    } catch {
      // El mensaje controlado se muestra debajo del formulario.
    }
  };

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <Database className="mt-1 h-5 w-5 text-emerald-600" aria-hidden="true" />
        <div>
          <h2 className="text-[20px] font-semibold text-black">
            1. Crear batch
          </h2>
          <p className="text-[15px] text-gray-500">
            Usa un preset para reducir errores manuales y ajusta solo lo
            necesario.
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {uploadPresets.map((preset) => {
          const isSelected = selectedPresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetChange(preset.id)}
              className={[
                "rounded-[8px] border p-3 text-left transition",
                isSelected
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 bg-white hover:bg-gray-50",
              ].join(" ")}
            >
              <span className="flex items-center justify-between gap-3 text-[15px] font-semibold text-black">
                {preset.label}
                {isSelected && (
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                )}
              </span>
              <span className="mt-1 block text-[13px] text-gray-500">
                {preset.description}
              </span>
            </button>
          );
        })}
      </div>

      {selectedPreset && (
        <div className="mb-4 rounded-[8px] bg-gray-50 p-3">
          <p className="text-[14px] font-semibold text-black">
            Roles esperados
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-gray-500">
            {selectedPreset.help.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Tipo de fuente
            <select
              value={form.sourceType}
              onChange={(event) =>
                handleSourceTypeChange(event.target.value as UploadSourceType)
              }
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500"
            >
              {sourceTypeOptions.map((sourceType) => (
                <option key={sourceType} value={sourceType}>
                  {sourceTypeLabels[sourceType]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Código de fuente
            <input
              value={form.dataSourceCode}
              onChange={(event) =>
                updateForm("dataSourceCode", event.target.value)
              }
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Versión del batch
            <input
              value={form.batchVersion}
              onChange={(event) =>
                updateForm("batchVersion", event.target.value)
              }
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Año fuente
            <input
              type="number"
              min={1900}
              value={form.sourceYear}
              onChange={(event) => updateForm("sourceYear", event.target.value)}
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Año análisis
            <input
              type="number"
              min={1900}
              value={form.analysisYear}
              onChange={(event) =>
                updateForm("analysisYear", event.target.value)
              }
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Archivos esperados
            <input
              type="number"
              min={1}
              value={form.expectedFiles}
              onChange={(event) =>
                updateForm("expectedFiles", event.target.value)
              }
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Modo
            <select
              value={form.processingMode}
              onChange={(event) =>
                updateForm(
                  "processingMode",
                  event.target.value as ProcessingMode
                )
              }
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500"
            >
              {processingModeOptions.map((mode) => (
                <option key={mode} value={mode}>
                  {processingModeLabels[mode]}
                </option>
              ))}
            </select>
          </label>
        </div>

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

        <button
          type="submit"
          disabled={createBatchMutation.isPending}
          className="inline-flex h-[42px] w-fit items-center gap-2 rounded-[6px] px-4 text-[15px] font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "var(--gradient-primary-green)" }}
        >
          <Database className="h-4 w-4" aria-hidden="true" />
          {createBatchMutation.isPending ? "Creando batch..." : "Crear batch"}
        </button>
      </form>
    </section>
  );
}
