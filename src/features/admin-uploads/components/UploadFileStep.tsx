import { FileUp, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useUploadBatchFileMutation } from "../mutations/adminUploads.mutations";
import type {
  CsvFileRole,
  UploadBatchDetail,
} from "../types/adminUploads.types";
import {
  fileRoleLabels,
  formatFileSize,
  getUploadError,
  isCsvFile,
  uploadStatusClassNames,
  uploadStatusLabels,
} from "./adminUploadsView.helpers";

type UploadFileStepProps = {
  detail?: UploadBatchDetail;
  allowedRoles: CsvFileRole[];
};

export default function UploadFileStep({
  detail,
  allowedRoles,
}: UploadFileStepProps) {
  const [selectedRole, setSelectedRole] = useState<CsvFileRole | "">(
    allowedRoles[0] ?? ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadFileMutation = useUploadBatchFileMutation();
  const batch = detail?.batch;
  const files = detail?.files ?? [];
  const effectiveRole = allowedRoles.includes(selectedRole as CsvFileRole)
    ? selectedRole
    : allowedRoles[0] ?? "";
  const uploadedFilesCount = files.length;
  const hasReachedExpectedFiles = batch
    ? uploadedFilesCount >= batch.expectedFiles
    : false;
  const requestError = uploadFileMutation.isError
    ? getUploadError(uploadFileMutation.error)
    : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    uploadFileMutation.reset();

    if (!batch) {
      setFormError("Crea un batch antes de subir archivos.");
      return;
    }

    if (!effectiveRole) {
      setFormError("Selecciona el rol del archivo.");
      return;
    }

    if (!selectedFile) {
      setFormError("Selecciona un archivo CSV.");
      return;
    }

    if (!isCsvFile(selectedFile)) {
      setFormError("El archivo debe tener extensión .csv.");
      return;
    }

    if (hasReachedExpectedFiles) {
      setFormError("Ya se subieron todos los archivos esperados para el batch.");
      return;
    }

    try {
      await uploadFileMutation.mutateAsync({
        batchId: batch.id,
        file: selectedFile,
        fileRole: effectiveRole,
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      // El mensaje controlado se muestra debajo del formulario.
    }
  };

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <Upload className="mt-1 h-5 w-5 text-emerald-600" aria-hidden="true" />
        <div>
          <h2 className="text-[20px] font-semibold text-black">
            2. Subir archivos
          </h2>
          <p className="text-[15px] text-gray-500">
            Sube archivos CSV sin previsualizarlos para mantener el flujo ligero.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Rol del archivo
            <select
              value={effectiveRole}
              disabled={!batch || allowedRoles.length === 0}
              onChange={(event) =>
                setSelectedRole(event.target.value as CsvFileRole)
              }
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 text-[15px] font-normal outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {allowedRoles.map((role) => (
                <option key={role} value={role}>
                  {fileRoleLabels[role]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-[14px] font-semibold text-black">
            Archivo CSV
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              disabled={!batch || hasReachedExpectedFiles}
              onChange={(event) => {
                setSelectedFile(event.target.files?.[0] ?? null);
                setFormError(null);
                uploadFileMutation.reset();
              }}
              className="h-[42px] rounded-[8px] border border-gray-200 px-3 py-2 text-[14px] font-normal outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>
        </div>

        {selectedFile && (
          <div className="flex flex-wrap items-center gap-3 rounded-[8px] bg-gray-50 p-3 text-[14px] text-gray-600">
            <FileUp className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="font-semibold text-black">{selectedFile.name}</span>
            <span>{formatFileSize(selectedFile.size)}</span>
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

        {batch && (
          <p className="text-[14px] text-gray-500">
            Archivos subidos: {uploadedFilesCount}/{batch.expectedFiles}
          </p>
        )}

        <button
          type="submit"
          disabled={!batch || uploadFileMutation.isPending}
          className="inline-flex h-[42px] w-fit items-center gap-2 rounded-[6px] px-4 text-[15px] font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "var(--gradient-primary-green)" }}
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          {uploadFileMutation.isPending ? "Subiendo..." : "Subir archivo"}
        </button>
      </form>

      <div className="mt-5">
        <h3 className="mb-2 text-[15px] font-semibold text-black">
          Archivos del batch
        </h3>

        {files.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead className="text-[12px] uppercase text-gray-500">
                <tr>
                  <th className="px-3 py-2">Archivo</th>
                  <th className="px-3 py-2">Rol</th>
                  <th className="px-3 py-2">Tamaño</th>
                  <th className="px-3 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-t border-gray-100">
                    <td className="max-w-[280px] truncate px-3 py-2 text-black">
                      {file.originalFileName}
                    </td>
                    <td className="px-3 py-2 text-gray-600">
                      {fileRoleLabels[file.fileRole as CsvFileRole] ??
                        file.fileRole}
                    </td>
                    <td className="px-3 py-2 text-gray-600">
                      {formatFileSize(file.fileSize)}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-[8px] bg-gray-50 p-3 text-[14px] text-gray-500">
            No hay archivos subidos en este batch.
          </p>
        )}
      </div>
    </section>
  );
}
