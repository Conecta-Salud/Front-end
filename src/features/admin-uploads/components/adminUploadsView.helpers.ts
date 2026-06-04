import axios from "axios";
import type {
  CreateUploadBatchRequest,
  CsvFileRole,
  ProcessingMode,
  UploadSourceType,
  UploadStatus,
} from "../types/adminUploads.types";

export type UploadPreset = {
  id: string;
  label: string;
  description: string;
  request: CreateUploadBatchRequest;
  allowedRoles: CsvFileRole[];
  help: string[];
};

export type UploadRequestError = {
  message: string;
  detail?: string;
};

export const uploadPresets: UploadPreset[] = [
  {
    id: "population",
    label: "Población",
    description: "Carga oficial de población municipal, estatal y nacional.",
    request: {
      sourceType: "population",
      dataSourceCode: "inegi_population",
      sourceYear: 2020,
      analysisYear: 2024,
      expectedFiles: 14,
      batchVersion: "population-official-full-v1",
      processingMode: "upsert",
    },
    allowedRoles: [
      "population_municipal_base",
      "population_state_national_indicators",
    ],
    help: [
      "13 archivos municipales: population_municipal_base",
      "1 archivo nacional/estatal: population_state_national_indicators",
    ],
  },
  {
    id: "health-establishments",
    label: "Establecimientos",
    description: "Catálogo de establecimientos de salud.",
    request: {
      sourceType: "health_establishments",
      dataSourceCode: "dgis_establishments",
      sourceYear: 2026,
      analysisYear: 2026,
      expectedFiles: 1,
      batchVersion: "health-establishments-2026-v1",
      processingMode: "upsert",
    },
    allowedRoles: ["establishments_catalog"],
    help: ["1 archivo: establishments_catalog"],
  },
  {
    id: "health-sectorial",
    label: "Sectorial",
    description: "Indicadores sectoriales por año de análisis.",
    request: {
      sourceType: "health_sectorial",
      dataSourceCode: "dgis_sectorial",
      sourceYear: 2024,
      analysisYear: 2024,
      expectedFiles: 1,
      batchVersion: "health-sectorial-2024-v1",
      processingMode: "upsert",
    },
    allowedRoles: ["sectorial_data"],
    help: [
      "1 archivo: sectorial_data",
      "Cada año sectorial debe cargarse en un batch separado: 2018, 2020, 2022 o 2024.",
    ],
  },
];

export const sourceTypeLabels: Record<UploadSourceType, string> = {
  population: "Población",
  health_establishments: "Establecimientos",
  health_sectorial: "Sectorial",
};

export const processingModeLabels: Record<ProcessingMode, string> = {
  validate_only: "Solo validar",
  upsert: "Insertar o actualizar",
  replace: "Reemplazar",
};

export const fileRoleLabels: Record<CsvFileRole, string> = {
  population_municipal_base: "Población municipal base",
  population_state_national_indicators: "Indicadores estatales/nacionales",
  establishments_catalog: "Catálogo de establecimientos",
  sectorial_data: "Datos sectoriales",
};

export const uploadStatusLabels: Record<UploadStatus, string> = {
  pending: "Pendiente",
  processing: "Procesando",
  completed: "Completado",
  warning: "Advertencia",
  error: "Error",
};

export const uploadStatusClassNames: Record<UploadStatus, string> = {
  pending: "bg-gray-100 text-gray-700",
  processing: "bg-blue-50 text-blue-700",
  completed: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  error: "bg-red-50 text-red-700",
};

const numberFormatter = new Intl.NumberFormat("es-MX");
const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getAllowedRolesForSourceType(sourceType?: UploadSourceType) {
  return (
    uploadPresets.find((preset) => preset.request.sourceType === sourceType)
      ?.allowedRoles ?? []
  );
}

export function getPresetForSourceType(sourceType?: UploadSourceType) {
  return uploadPresets.find((preset) => preset.request.sourceType === sourceType);
}

export function formatNumber(value?: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "N/D";
  }

  return numberFormatter.format(value);
}

export function formatFileSize(value?: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "N/D";
  }

  if (value < 1024) {
    return `${numberFormatter.format(value)} B`;
  }

  if (value < 1024 * 1024) {
    return `${numberFormatter.format(value / 1024)} KB`;
  }

  return `${numberFormatter.format(value / (1024 * 1024))} MB`;
}

export function formatDateTime(value?: string | null) {
  if (!value) return "N/D";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return dateFormatter.format(date);
}

export function isCsvFile(file: File | null) {
  return Boolean(file?.name.toLowerCase().endsWith(".csv"));
}

export function getUploadError(error: unknown): UploadRequestError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (isRecord(data)) {
      const message =
        typeof data.message === "string"
          ? data.message
          : "No se pudo completar la solicitud.";
      const detail =
        typeof data.detail === "string" ? data.detail : undefined;

      return { message, detail };
    }

    if (error.message) {
      return { message: error.message };
    }
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "No se pudo completar la solicitud." };
}
