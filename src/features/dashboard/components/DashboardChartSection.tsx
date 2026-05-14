import CustomBarChart from "../../../components/charts/BarChart/BarChart";
import CustomPieChart from "../../../components/charts/PieChart/PieChart";
import type { DashboardChart } from "../types/dashboardSummary.types";
import {
  adaptSummaryChartTitle,
  adaptSummaryChartToBarData,
  adaptSummaryChartToPieData,
} from "../utils/dashboardChart.adapter";
import DashboardScatterChart from "./DashboardScatterChart";

type DashboardChartSectionProps = {
  chart?: DashboardChart;
  isLoading?: boolean;
  isError?: boolean;
  height?: number;
};

export default function DashboardChartSection({
  chart,
  isLoading = false,
  isError = false,
  height = 320,
}: DashboardChartSectionProps) {
  if (isLoading) {
    return (
      <div className="h-[380px] rounded-[10px] bg-white shadow-sm animate-pulse" />
    );
  }

  if (isError) {
    return (
      <div className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-red-500">
          No se pudo cargar los datos del gráfico.
        </p>
      </div>
    );
  }

  if (!chart) {
    return (
      <div className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-gray-500">
          No hay datos gráficos disponibles.
        </p>
      </div>
    );
  }
  
  const translatedTitle = adaptSummaryChartTitle(chart);
  const chartType = String(chart.type).toLowerCase();

  if (chartType === "bar") {
    return (
      <CustomBarChart
        title={translatedTitle}
        data={adaptSummaryChartToBarData(chart)}
        chartHeight={height}
        referenceLine={chart.referenceLine}
        showAverageLine={false}
      />
    );
  }

  if (chartType === "pie") {
    return (
      <CustomPieChart
        title={translatedTitle}
        data={adaptSummaryChartToPieData(chart)}
        chartHeight={height}
      />
    );
  }

  if (chartType === "scatter") {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <h2
          className="mb-4 text-[20px] font-semibold"
          style={{
            backgroundImage: "var(--gradient-primary-green)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {translatedTitle}
        </h2>

        <DashboardScatterChart chart={chart} height={height} />
      </section>
    );
  }
  
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-sm">
      <p className="text-[16px] text-gray-500">
        Tipo de gráfico no soportado: {String(chart.type)}
      </p>
    </div>
  );
}