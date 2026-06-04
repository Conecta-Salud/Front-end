import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useUploadBatchErrorsQuery } from "../queries/adminUploads.queries";
import { translateUploadMessage } from "../utils/uploadMessageTranslation";

type UploadErrorsTableProps = {
  batchId?: number | null;
};

const PAGE_SIZE = 20;

export default function UploadErrorsTable({ batchId }: UploadErrorsTableProps) {
  const [page, setPage] = useState(0);
  const errorsQuery = useUploadBatchErrorsQuery(
    batchId,
    {
      page,
      size: PAGE_SIZE,
    },
    {
      enabled: Boolean(batchId),
    }
  );
  const errors = errorsQuery.data?.items ?? [];
  const totalPages = errorsQuery.data?.totalPages ?? 0;
  const canGoPrevious = page > 0;
  const canGoNext = totalPages > 0 && page + 1 < totalPages;

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertCircle
            className="mt-1 h-5 w-5 text-amber-600"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-[20px] font-semibold text-black">
              5. Errores del batch
            </h2>
            <p className="text-[15px] text-gray-500">
              Revisa fila, columna, valor y mensaje devuelto por el backend.
            </p>
          </div>
        </div>

        {batchId && (
          <button
            type="button"
            onClick={() => void errorsQuery.refetch()}
            className="h-[34px] rounded-[6px] bg-gray-100 px-3 text-[13px] font-semibold text-gray-700"
          >
            Actualizar
          </button>
        )}
      </div>

      {!batchId && (
        <p className="rounded-[8px] bg-gray-50 p-3 text-[14px] text-gray-500">
          Crea o selecciona un batch para consultar errores.
        </p>
      )}

      {batchId && errorsQuery.isLoading && (
        <div className="h-[160px] animate-pulse rounded-[8px] bg-gray-100" />
      )}

      {batchId && errorsQuery.isError && (
        <p className="rounded-[8px] bg-red-50 p-3 text-[14px] text-red-700">
          No se pudieron cargar los errores del batch.
        </p>
      )}

      {batchId && !errorsQuery.isLoading && !errorsQuery.isError && (
        <>
          {errors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-[14px]">
                <thead className="text-[12px] uppercase text-gray-500">
                  <tr>
                    <th className="px-3 py-2">Fila</th>
                    <th className="px-3 py-2">Archivo</th>
                    <th className="px-3 py-2">Columna</th>
                    <th className="px-3 py-2">Valor</th>
                    <th className="px-3 py-2">Código</th>
                    <th className="px-3 py-2">Mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {errors.map((error) => (
                    <tr key={error.id} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-gray-600">
                        {error.csvRowNumber ?? "N/D"}
                      </td>
                      <td className="max-w-[220px] truncate px-3 py-2 text-black">
                        {error.originalFileName ?? "N/D"}
                      </td>
                      <td className="px-3 py-2 text-gray-600">
                        {error.columnName ?? "N/D"}
                      </td>
                      <td className="max-w-[180px] truncate px-3 py-2 text-gray-600">
                        {error.rawValue ?? "N/D"}
                      </td>
                      <td className="px-3 py-2 font-semibold text-gray-700">
                        {error.errorCode}
                      </td>
                      <td className="px-3 py-2 text-gray-600">
                        {translateUploadMessage(error.errorMessage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-[8px] bg-emerald-50 p-3 text-[14px] text-emerald-700">
              No hay errores registrados para este batch.
            </p>
          )}

          <div className="mt-4 flex items-center justify-between gap-3 text-[13px] text-gray-500">
            <span>
              Página {totalPages === 0 ? 0 : page + 1} de {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={!canGoPrevious}
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                className="inline-flex h-[32px] items-center gap-1 rounded-[6px] bg-gray-100 px-3 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Anterior
              </button>
              <button
                type="button"
                disabled={!canGoNext}
                onClick={() => setPage((prev) => prev + 1)}
                className="inline-flex h-[32px] items-center gap-1 rounded-[6px] bg-gray-100 px-3 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
