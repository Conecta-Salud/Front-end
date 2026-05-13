import CustomKPI from "../components/ui/KPI/CustomKPI";
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <CustomKPI
              title="Promedio médicos por 1000 habitantes"
              value="2.5"
              size="md"
              variant="green"
              fullWidth
            ></CustomKPI>
            <CustomKPI
              title="Promedio médicos por 1000 habitantes"
              value="2.5"
              size="md"
              variant="green"
              fullWidth
            ></CustomKPI>
            <CustomKPI
              title="Promedio médicos por 1000 habitantes"
              value="2.5"
              size="md"
              variant="green"
              fullWidth
            ></CustomKPI>
            <CustomKPI
              title="Promedio médicos por 1000 habitantes"
              value="2.5"
              size="md"
              variant="default"
              fullWidth
            ></CustomKPI>
          </div>
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
