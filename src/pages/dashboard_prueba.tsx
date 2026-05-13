import RankingTableModal from "../components/ui/RankingTable/RankingTableModal";
import RankingTableCard from "../components/ui/RankingTable/RankingTableCard";
import { useState } from "react";

import {
  rankingData,
  compactColumns,
} from "../mocks/rankingTable.mock";
import { data } from "../mocks/piechart.mock";
import { chartData } from "../mocks/barchart.mock";
import CustomButton from "../components/ui/Button/Button";
import exportIcon from "../assets/icons/button/downloadIcon.svg";
import CustomPieChart from "../components/charts/PieChart/PieChart";
import CustomBarChart from "../components/charts/BarChart/BarChart";

import HealthMap from "../features/health-map/components/HealthMap";
import type { HealthMapNavigationState } from "../features/health-map/types/healthMap.types";
import { useDashboardScope } from "../features/dashboard/hooks/useDashboardScope";
import { useHeaderFilterStore } from "../stores/headerFilterStore";
import { useDashboardKpis } from "../features/dashboard/hooks/useDashboardKpis";
import CustomKPI from "../components/ui/KPI/CustomKPI";

function DashboardEstrategicoPrueba() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const year = useHeaderFilterStore((state) => state.year);
    const indicator = useHeaderFilterStore((state) => state.category);

  const [mapNavigation, setMapNavigation] = useState<HealthMapNavigationState>({
    level: "country",
    selectedState: null,
  });

  const goToCountry = () => {
    setMapNavigation({
      level: "country",
      selectedState: null,
      selectedMunicipality: null,
    });
  };

  const goToState = () => {
    if (!mapNavigation.selectedState) return;

    setMapNavigation({
      level: "state",
      selectedState: mapNavigation.selectedState,
      selectedMunicipality: null,
    });
  };

  const dashboardScope = useDashboardScope({
    navigation: mapNavigation,
    year,
  });

  const dashboardKpis = useDashboardKpis({
    scope: dashboardScope,
  });

  const visibleKpis = dashboardKpis.kpis.slice(0, 4);

  const kpiColumns = [
    visibleKpis.slice(0, 2),
    visibleKpis.slice(2, 4),
  ];

  console.log("Dashboard scope:", dashboardScope);

  return (
    <div className="p-6 bg-[#f5f5f5] min-h-screen">
      <div className="flex items-start justify-between mb-6">
        {/* IZQUIERDA */}
        <div>
          <h1 className="text-4xl font-bold">Mexico</h1>
          <p className="text-gray-600">
            Indicadores de cobertura médica | 2026
          </p>
        </div>
        {/* DERECHA */}
        <CustomButton
          label="Exportar"
          tone="blue"
          height="40"
          icon={<img src={exportIcon} alt="Exportar" className="w-4 h-4" />}
          iconPlacement="right"
          textSize="md"
          loading={false}
          disabled={false}
          type="button"
        />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
        {/* Mapa */}
          <section className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-bold leading-tight text-black">
                  <button
                    type="button"
                    onClick={goToCountry}
                    disabled={mapNavigation.level === "country"}
                    className={[
                      "transition-opacity",
                      mapNavigation.level === "country"
                        ? "cursor-default font-bold text-black"
                        : "cursor-pointer font-normal hover:opacity-70",
                    ].join(" ")}
                  >
                    México
                  </button>
    
                  {mapNavigation.selectedState && (
                    <>
                      <span className="font-normal"> &gt; </span>
    
                      <button
                        type="button"
                        onClick={goToState}
                        disabled={mapNavigation.level === "state"}
                        className={[
                          "transition-opacity",
                          mapNavigation.level === "state"
                            ? "cursor-default font-bold text-black"
                            : "cursor-pointer font-normal hover:opacity-70",
                        ].join(" ")}
                      >
                        {mapNavigation.selectedState.name}
                      </button>
                    </>
                  )}
    
                  {mapNavigation.selectedMunicipality && (
                    <>
                      <span className="font-normal"> &gt; </span>
    
                      <span className="font-bold text-black">
                        {mapNavigation.selectedMunicipality.name}
                      </span>
                    </>
                  )}
                </h1>
    
                <p className="text-[16px] text-black">
                  Indicadores de cobertura médica | {year}
                </p>
              </div>
            </div>
    
            <HealthMap
              indicator={indicator}
              year={year}
              navigation={mapNavigation}
              onNavigationChange={setMapNavigation}
            />
          </section>

          {/*TABLAS A LA DERECHA DEL MAPA*/}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">

              {dashboardKpis.isFetching && (
                <span className="text-[14px] text-gray-400">
                  Updating...
                </span>
              )}
            </div>

            {dashboardKpis.isLoading ? (
              <div className="grid grid-cols-2 gap-[18px]">
                {Array.from({ length: 2 }).map((_, columnIndex) => (
                  <div key={columnIndex} className="flex flex-col gap-4">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-[140px] rounded-[10px] bg-white shadow-sm animate-pulse"
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : dashboardKpis.isError ? (
              <div className="rounded-[10px] bg-white p-6 shadow-sm">
                <p className="text-[16px] text-red-500">
                  Could not load dashboard KPIs.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-[18px]">
                {kpiColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="flex flex-col gap-4">
                    {column.map((kpi) => (
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
                ))}
              </div>
            )}
          </section>

          <div>
            <RankingTableCard
              title="Estados con menor cobertura médica"
              columns={compactColumns}
              data={rankingData}
              footerText="Ver ranking completo"
              onFooterClick={() => setIsModalOpen(true)}
            />

            <RankingTableModal
              isOpen={isModalOpen}
              title="Ranking completo de cobertura médica"
              columns={compactColumns}
              data={rankingData}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-7">
          <CustomBarChart data={chartData}></CustomBarChart>
        </div>
        <div className="col-span-5">
          <CustomPieChart
            data={data}
            title="Distribución de especialidades"
            chartHeight={350}
            showLegend={true}
            isAnimationActive={true}
            emptyMessage="No hay datos disponibles."
          />
        </div>
      </div>
    </div>
  );
}
export default DashboardEstrategicoPrueba;
