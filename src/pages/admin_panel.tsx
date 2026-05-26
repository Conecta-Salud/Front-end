import { useState } from "react";

import AdminUsersView from "../features/admin/components/AdminUsersView";
import AdminViewTabs from "../features/admin/components/AdminViewTabs";
import type { AdminTab } from "../features/admin/types/admin.types";

function PanelAdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("users");
  return (
    <main className="flex h-[calc(100vh-168px)] min-h-0 flex-col gap-3 overflow-hidden">
      {" "}
      <section className="shrink-0">
        <h1 className="text-[28px] font-bold leading-tight text-black">
          Panel de Administración
        </h1>
        <p className="text-[16px] text-black">
          Gestiona usuarios, actividad y fuentes de datos del sistema.
        </p>
      </section>
      <AdminViewTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "users" && <AdminUsersView />}
      {activeTab === "activity" && (
        <section className="rounded-[10px] bg-white p-6 shadow-sm">
          <h2 className="text-[22px] font-semibold text-black">Actividad</h2>
          <p className="text-[16px] text-gray-500">
            Aquí conectaremos la bitácora de actividad.
          </p>
        </section>
      )}
      {activeTab === "data" && (
        <section className="rounded-[10px] bg-white p-6 shadow-sm">
          <h2 className="text-[22px] font-semibold text-black">Datos</h2>
          <p className="text-[16px] text-gray-500">
            Aquí conectaremos el estado de las fuentes de datos.
          </p>
        </section>
      )}
    </main>
  );
}

export default PanelAdminPage;
