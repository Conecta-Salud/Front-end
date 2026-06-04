import { useState } from "react";

import CustomKPI from "../components/ui/KPI/CustomKPI";
import { useAdminOverviewQuery } from "../features/admin/queries/adminOverview.queries";
import AdminUsersView from "../features/admin/components/AdminUsersView";
import AdminActivityView from "../features/admin/components/AdminActivityView";
import AdminViewTabs from "../features/admin/components/AdminViewTabs";
import type { AdminTab } from "../features/admin/types/admin.types";
import AdminUploadsPanel from "../features/admin-uploads/components/AdminUploadsPanel";

function PanelAdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("users");
  const { data: overview } = useAdminOverviewQuery();

  return (
    <main className="flex min-h-[calc(100vh-168px)] flex-col gap-3 overflow-y-auto p-6">
      <section className="grid shrink-0 grid-cols-[minmax(0,1fr)_minmax(520px,1fr)] items-start gap-6">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-[28px] font-bold leading-tight text-black">
              Panel de Administración
            </h1>

            <p className="text-[16px] text-black">
              Gestiona usuarios, actividad y fuentes de datos del sistema.
            </p>
          </div>

          <AdminViewTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="grid w-full grid-cols-4 gap-3">
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
            title="Cargas"
            titleSecondLine="completadas"
            value={
              overview?.completedUploadBatches ??
              0
            }
          />
        </div>
      </section>

      {activeTab === "users" && <AdminUsersView />}
      {activeTab === "activity" && <AdminActivityView />}
      {activeTab === "data" && <AdminUploadsPanel />}
    </main>
  );
}

export default PanelAdminPage;
