import { History, RefreshCw } from "lucide-react";
import { useUploadBatchesQuery } from "../queries/adminUploads.queries";
import type { UploadBatchSummary } from "../types/adminUploads.types";
import {
  formatDateTime,
  sourceTypeLabels,
  uploadStatusClassNames,
  uploadStatusLabels,
} from "./adminUploadsView.helpers";

type UploadBatchHistoryProps = {
  selectedBatchId?: number | null;
  onSelectBatch: (batch: UploadBatchSummary) => void;
};

export default function UploadBatchHistory({
  selectedBatchId,
  onSelectBatch,
}: UploadBatchHistoryProps) {
  const batchesQuery = useUploadBatchesQuery({
    page: 0,
    size: 8,
  });
  const batches = batchesQuery.data?.items ?? [];

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <History className="mt-1 h-5 w-5 text-gray-500" aria-hidden="true" />
          <div>
            <h2 className="text-[18px] font-semibold text-black">
              Historial reciente
            </h2>
            <p className="text-[14px] text-gray-500">
              Selecciona un batch existente para revisarlo.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void batchesQuery.refetch()}
          className="inline-flex h-[32px] items-center gap-2 rounded-[6px] bg-gray-100 px-3 text-[13px] font-semibold text-gray-700"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Actualizar
        </button>
      </div>

      {batchesQuery.isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[56px] animate-pulse rounded-[8px] bg-gray-100"
            />
          ))}
        </div>
      )}

      {batchesQuery.isError && (
        <p className="rounded-[8px] bg-red-50 p-3 text-[14px] text-red-700">
          No se pudo cargar el historial de batches.
        </p>
      )}

      {!batchesQuery.isLoading && !batchesQuery.isError && (
        <>
          {batches.length > 0 ? (
            <div className="flex flex-col gap-2">
              {batches.map((batch) => {
                const isSelected = selectedBatchId === batch.id;

                return (
                  <button
                    key={batch.id}
                    type="button"
                    onClick={() => onSelectBatch(batch)}
                    className={[
                      "rounded-[8px] border p-3 text-left transition",
                      isSelected
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 bg-white hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-black">
                          #{batch.id} · {sourceTypeLabels[batch.sourceType]}
                        </p>
                        <p className="truncate text-[13px] text-gray-500">
                          {batch.batchVersion}
                        </p>
                      </div>

                      <span
                        className={[
                          "shrink-0 rounded-full px-2 py-1 text-[12px] font-semibold",
                          uploadStatusClassNames[batch.status],
                        ].join(" ")}
                      >
                        {uploadStatusLabels[batch.status]}
                      </span>
                    </div>

                    <p className="mt-2 text-[12px] text-gray-400">
                      {formatDateTime(batch.createdAt)}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="rounded-[8px] bg-gray-50 p-3 text-[14px] text-gray-500">
              No hay batches registrados todavía.
            </p>
          )}
        </>
      )}
    </section>
  );
}
