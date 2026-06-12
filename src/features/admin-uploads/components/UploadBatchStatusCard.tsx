import { Database, FileText } from "lucide-react";
import type {
  UploadBatchDetail,
  UploadBatchSummary,
} from "../types/adminUploads.types";
import {
  formatDateTime,
  formatNumber,
  processingModeLabels,
  sourceTypeLabels,
  uploadStatusClassNames,
  uploadStatusLabels,
} from "./adminUploadsView.helpers";

type UploadBatchStatusCardProps = {
  detail?: UploadBatchDetail;
  batch?: UploadBatchSummary;
  isLoading?: boolean;
};

export default function UploadBatchStatusCard({
  detail,
  batch: fallbackBatch,
  isLoading = false,
}: UploadBatchStatusCardProps) {
  const batch = detail?.batch ?? fallbackBatch;
  const files = detail?.files ?? [];

  if (isLoading) {
    return (
      <section className="rounded-[10px] bg-white p-5 shadow-sm">
        <div className="h-[160px] animate-pulse rounded-[8px] bg-gray-100" />
      </section>
    );
  }

  if (!batch) {
    return (
      <section className="rounded-[10px] bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Database className="mt-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          <div>
            <h3 className="text-[18px] font-semibold text-black">
              Sin batch activo
            </h3>
            <p className="text-[15px] text-gray-500">
              Crea un batch para iniciar la carga de archivos CSV.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h3 className="text-[18px] font-semibold text-black">
              Batch #{batch.id}
            </h3>
          </div>
          <p className="mt-1 text-[14px] text-gray-500">
            {sourceTypeLabels[batch.sourceType]} · {batch.dataSourceCode}
          </p>
        </div>

        <span
          className={[
            "rounded-full px-3 py-1 text-[13px] font-semibold",
            uploadStatusClassNames[batch.status],
          ].join(" ")}
        >
          {uploadStatusLabels[batch.status]}
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-[14px] lg:grid-cols-4">
        <div>
          <dt className="text-gray-500">Año fuente</dt>
          <dd className="font-semibold text-black">{batch.sourceYear}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Año análisis</dt>
          <dd className="font-semibold text-black">
            {batch.analysisYear ?? "N/D"}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Modo</dt>
          <dd className="font-semibold text-black">
            {processingModeLabels[batch.processingMode]}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Versión</dt>
          <dd className="break-words font-semibold text-black">
            {batch.batchVersion}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Archivos</dt>
          <dd className="font-semibold text-black">
            {batch.uploadedFiles}/{batch.expectedFiles}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Registros</dt>
          <dd className="font-semibold text-black">
            {formatNumber(batch.totalRecords)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Válidos</dt>
          <dd className="font-semibold text-black">
            {formatNumber(batch.validRecords)}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">Errores</dt>
          <dd className="font-semibold text-black">
            {formatNumber(batch.errorRecords)}
          </dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-black">
          <FileText className="h-4 w-4 text-gray-500" aria-hidden="true" />
          Archivos recientes
        </div>

        {files.length > 0 ? (
          <div className="flex flex-col gap-2">
            {files.slice(0, 3).map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between gap-3 rounded-[8px] bg-gray-50 px-3 py-2 text-[13px]"
              >
                <span className="min-w-0 truncate text-black">
                  {file.originalFileName}
                </span>
                <span className="shrink-0 text-gray-500">
                  {uploadStatusLabels[file.status]}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[14px] text-gray-500">
            Todavía no hay archivos subidos.
          </p>
        )}
      </div>

      <p className="mt-4 text-[12px] text-gray-400">
        Creado: {formatDateTime(batch.createdAt)}
      </p>
    </section>
  );
}
