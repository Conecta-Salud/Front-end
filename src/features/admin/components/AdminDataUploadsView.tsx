import { useState } from "react";

import CustomButton from "../../../components/ui/Button/Button";
import AdminUploadModal from "./AdminUploadModal";

export default function AdminDataUploadsView() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <section className="rounded-[10px] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-[22px] font-semibold"
            style={{ color: "var(--color-blue)" }}
          >
            Datos
          </h2>
          <p
            className="text-[16px]"
            style={{ color: "var(--color-gray)" }}
          >
            Administra la carga de archivos CSV del sistema.
          </p>
        </div>

        <CustomButton
          label="Importar"
          tone="blue"
          height="40"
          textSize="md"
          onClick={() => setIsUploadModalOpen(true)}
        />
      </div>

      <div className="rounded-[8px] border border-gray-200 p-4">
        <p
          className="text-[15px]"
          style={{ color: "var(--color-gray)" }}
        >
          Puedes cargar archivos para Datos poblacionales, Salud sectorial y
          Salud establecimientos.
        </p>
      </div>

      <AdminUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </section>
  );
}
