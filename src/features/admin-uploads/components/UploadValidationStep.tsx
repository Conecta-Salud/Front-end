import { CheckCircle2, ListChecks } from "lucide-react";
import { useState } from "react";
import { useValidateUploadMutation } from "../mutations/adminUploads.mutations";
import type {
  CsvFileRole,
  UploadBatchDetail,
} from "../types/adminUploads.types";
import {
  fileRoleLabels,
  formatNumber,
  getUploadError,
  uploadStatusClassNames,
  uploadStatusLabels,
} from "./adminUploadsView.helpers";

type UploadValidationStepProps = {
  detail?: UploadBatchDetail;
};

export default function UploadValidationStep({
  detail,
}: UploadValidationStepProps) {
  const [validatingUploadId, setValidatingUploadId] = useState<number | null>(
    null
  );
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const validateUploadMutation = useValidateUploadMutation();
  const batch = detail?.batch;
  const files = detail?.files ?? [];
  const hasFiles = files.length > 0;
  const requestError = validateUploadMutation.isError
    ? getUploadError(validateUploadMutation.error)
    : null;

  const handleValidateFile = async (uploadId: number) => {
    if (!batch) return;

    setValidatingUploadId(uploadId);
    setValidationMessage(null);
    validateUploadMutation.reset();

    try {
      await validateUploadMutation.mutateAsync({
        uploadId,
        batchId: batch.id,
      });
      setValidationMessage("Archivo validado correctamente.");
    } catch {
      // El mensaje controlado se muestra debajo de la tabla.
    } finally {
      setValidatingUploadId(null);
    }
  };

  const handleValidateAll = async () => {
    if (!batch || !hasFiles) return;

    setValidationMessage(null);
    validateUploadMutation.reset();

    try {
      for (const file of files) {
        setValidatingUploadId(file.id);
        await validateUploadMutation.mutateAsync({
          uploadId: file.id,
          batchId: batch.id,
        });
      }

      setValidationMessage("Validación de archivos completada.");
    } catch {
      // El mensaje controlado se muestra debajo de la tabla.
    } finally {
      setValidatingUploadId(null);
    }
  };

  const isValidating = validateUploadMutation.isPending;

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <ListChecks
            className="mt-1 h-5 w-5 text-emerald-600"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-[20px] font-semibold text-black">
              3. Validar archivos
            </h2>
            <p className="text-[15px] text-gray-500">
              Valida cada CSV antes de procesar el batch.
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={!batch || !hasFiles || isValidating}
          onClick={handleValidateAll}
          className="inline-flex h-[38px] items-center gap-2 rounded-[6px] border border-emerald-500 px-3 text-[14px] font-semibold text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {isValidating ? "Validando..." : "Validar todos"}
        </button>
      </div>

      {files.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[14px]">
            <thead className="text-[12px] uppercase text-gray-500">
              <tr>
                <th className="px-3 py-2">Archivo</th>
                <th className="px-3 py-2">Rol</th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Válidos</th>
                <th className="px-3 py-2">Errores</th>
                <th className="px-3 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-t border-gray-100">
                  <td className="max-w-[260px] truncate px-3 py-2 text-black">
                    {file.originalFileName}
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {fileRoleLabels[file.fileRole as CsvFileRole] ??
                      file.fileRole}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={[
                        "rounded-full px-2 py-1 text-[12px] font-semibold",
                        uploadStatusClassNames[file.status],
                      ].join(" ")}
                    >
                      {uploadStatusLabels[file.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {formatNumber(file.totalRecords)}
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {formatNumber(file.validRecords)}
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {formatNumber(file.errorRecords)}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      disabled={isValidating}
                      onClick={() => {
                        handleValidateFile(file.id);
                      }}
                      className="inline-flex h-[32px] items-center gap-2 rounded-[6px] bg-gray-100 px-3 text-[13px] font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      {validatingUploadId === file.id
                        ? "Validando..."
                        : "Validar archivo"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-[8px] bg-gray-50 p-3 text-[14px] text-gray-500">
          Sube al menos un archivo para habilitar la validación.
        </p>
      )}

      {validationMessage && (
        <p className="mt-3 rounded-[8px] bg-emerald-50 p-3 text-[14px] text-emerald-700">
          {validationMessage}
        </p>
      )}

      {requestError && (
        <div className="mt-3 rounded-[8px] bg-red-50 p-3 text-[14px] text-red-700">
          <p>{requestError.message}</p>
          {requestError.detail && (
            <p className="mt-1 text-[13px] text-red-600">
              {requestError.detail}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
