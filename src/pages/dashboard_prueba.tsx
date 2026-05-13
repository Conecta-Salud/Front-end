import CustomKPI from "../components/KPI/CustomKPI";
import RankingTableModal from "../components/RankingTable/RankingTableModal";
import RankingTableCard from "../components/RankingTable/RankingTableCard";
import { useState } from "react";

import {
  rankingData,
  compactColumns,
  fullColumns,
} from "../mocks/rankingTable.mock";
import { data } from "../mocks/piechart.mock";
import { chartData } from "../mocks/barchart.mock";
import CustomButton from "../components/Button/Button";
import exportIcon from "../assets/icons/button/downloadIcon.svg";
import CustomPieChart from "../components/PieChart/PieChart";
import CustomBarChart from "../components/BarChart/BarChart";

function DashboardEstrategicoPrueba() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          {/*MAPA*/}
          <h1 className="text-4xl font-bold">Espacio para el mapa</h1>
        </div>
        <div className="col-span-5">
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
