import { useState } from "react";

import CustomKPI from "../components/ui/KPI/CustomKPI";
import { useAdminOverviewQuery } from "../features/admin/queries/adminOverview.queries";
import AdminUsersView from "../features/admin/components/AdminUsersView";
import AdminActivityView from "../features/admin/components/AdminActivityView";
import AdminViewTabs from "../features/admin/components/AdminViewTabs";
import type { AdminTab } from "../features/admin/types/admin.types";

function PanelAdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("users");
  const { data: overview } = useAdminOverviewQuery();
  return (
    <main className="flex h-[calc(100vh-168px)] min-h-0 flex-col gap-3 overflow-hidden p-6">
      <section className="shrink-0 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-black">
            Panel de Administración
          </h1>

          <p className="text-[16px] text-black">
            Gestiona usuarios, actividad y fuentes de datos del sistema.
          </p>
        </div>

        <div className="flex gap-3">
          <CustomKPI
            size="xs"
            variant="green"
            title="Usuarios"
            titleSecondLine="registrados"
            value={overview?.registeredUsers ?? 0}
          />

          <CustomKPI
            size="xs"
            title="Usuarios"
            titleSecondLine="activos"
            subtitle="últimos 7 días"
            value={overview?.activeUsersLast7Days ?? 0}
          />

          <CustomKPI
            size="xs"
            title="Comparaciones"
            titleSecondLine="realizadas"
            value={overview?.comparisonsPerformed ?? 0}
          />

          <CustomKPI
            size="xs"
            title="Reportes"
            titleSecondLine="exportados"
            value={overview?.exportedReports ?? 0}
          />
        </div>
      </section>
      <AdminViewTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "users" && <AdminUsersView />}
      {activeTab === "activity" && <AdminActivityView />}
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
