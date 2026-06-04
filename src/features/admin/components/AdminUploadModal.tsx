import { useMemo, useState } from "react";

import CustomButton from "../../../components/ui/Button/Button";
import ImportButton from "../../../components/ui/ImportButton/ImportButton";
import { ADMIN_UPLOAD_OPTIONS } from "../constants/adminUploads.constants";
import { useAdminUploadCsvMutation } from "../queries/adminUploads.queries";
import type { AdminUploadDataset } from "../types/adminUploads.types";

type AdminUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminUploadModal({
  isOpen,
  onClose,
}: AdminUploadModalProps) {
  const [selectedDataset, setSelectedDataset] =
    useState<AdminUploadDataset>("indicators");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadMutation = useAdminUploadCsvMutation();

  const selectedOption = useMemo(
    () =>
      ADMIN_UPLOAD_OPTIONS.find((option) => option.value === selectedDataset),
    [selectedDataset]
  );

  if (!isOpen) return null;

  const handleClose = () => {
    if (uploadMutation.isPending) return;

    setSelectedFile(null);
    uploadMutation.reset();
    onClose();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    await uploadMutation.mutateAsync({
      dataset: selectedDataset,
      file: selectedFile,
    });

    setSelectedFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <section className="w-full max-w-[520px] rounded-[10px] bg-white p-6 shadow-lg">
        <div className="mb-5">
          <h2 className="text-[22px] font-semibold text-black">
            Cargar archivo CSV
          </h2>
          <p className="text-[15px] text-gray-500">
            Selecciona el tipo de datos y sube el archivo correspondiente.
          </p>
        </div>

        <div className="mb-5 flex flex-col gap-3">
          {ADMIN_UPLOAD_OPTIONS.map((option) => {
            const isSelected = selectedDataset === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelectedDataset(option.value);
                  uploadMutation.reset();
                }}
                className={[
                  "rounded-[8px] border px-4 py-3 text-left text-[15px] font-semibold transition",
                  "focus:outline-none focus:ring-2 focus:ring-[#57D8BE] focus:ring-offset-2",
                  isSelected
                    ? "border-[#14B8A6] bg-[#E6FFFA] text-black"
                    : "border-gray-200 bg-white text-black hover:bg-gray-50",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="mb-4 rounded-[8px] border border-gray-200 p-4">
          <p className="mb-3 text-[14px] font-semibold text-black">
            Archivo para {selectedOption?.label}
          </p>

          <ImportButton
            accept=".csv,text/csv"
            onFileSelect={(file) => {
              setSelectedFile(file);
              uploadMutation.reset();
            }}
          />

          {selectedFile && (
            <p className="mt-3 text-[14px] text-gray-500">
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
        </div>

        {uploadMutation.isError && (
          <p className="mb-4 text-[14px] text-red-500">
            No se pudo subir el archivo. Verifica que sea un CSV válido.
          </p>
        )}

        {uploadMutation.isSuccess && (
          <p className="mb-4 text-[14px] text-[#0F766E]">
            Archivo subido correctamente.
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={uploadMutation.isPending}
            className="rounded-[6px] border border-gray-200 px-4 py-2 text-[15px] font-semibold text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cerrar
          </button>

          <CustomButton
            label="Subir archivo"
            disabled={!selectedFile || uploadMutation.isPending}
            loading={uploadMutation.isPending}
            onClick={handleUpload}
            height="40"
            textSize="md"
          />
        </div>
      </section>
    </div>
  );
}
