import { useMemo } from "react";
import CustomKPI from "../../../components/ui/KPI/CustomKPI";
import type { DashboardKpi } from "../types/dashboardSummary.types";
import { adaptSummaryKpisToCards } from "../utils/dashboardKpiSummary.adapter";

type DashboardKpiGridProps = {
  kpis?: DashboardKpi[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function DashboardKpiGrid({
  kpis = [],
  isLoading = false,
  isError = false,
}: DashboardKpiGridProps) {
  const cards = useMemo(() => adaptSummaryKpisToCards(kpis), [kpis]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-[18px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[110px] rounded-[10px] bg-white shadow-sm animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-red-500">
          No se pudieron cargar los datos de KPI.
        </p>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-gray-500">
          No hay datos de KPI disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-[18px]">
      {cards.slice(0, 4).map((kpi) => (
        <CustomKPI
          key={kpi.id}
          title={kpi.title}
          titleSecondLine={kpi.titleSecondLine}
          value={kpi.value}
          variant={kpi.variant}
          size="sm"
          fullWidth
        />
      ))}
    </div>
  );
}