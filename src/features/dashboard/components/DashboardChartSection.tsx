import { useMemo } from "react";

import CustomBarChart from "../../../components/charts/BarChart/BarChart";
import type { ChartData } from "../../../components/charts/BarChart/BarChart";
import CustomPieChart from "../../../components/charts/PieChart/PieChart";
import type { PieChartDataItem } from "../../../components/charts/PieChart/PieChart";
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

type DashboardChartView =
  | {
      type: "bar";
      title: string;
      data: ChartData[];
      referenceLine: DashboardChart["referenceLine"];
    }
  | {
      type: "pie";
      title: string;
      data: PieChartDataItem[];
    }
  | {
      type: "scatter";
      title: string;
      chart: DashboardChart;
    }
  | {
      type: "unsupported";
      rawType: DashboardChart["type"];
    };

export default function DashboardChartSection({
  chart,
  isLoading = false,
  isError = false,
  height = 320,
}: DashboardChartSectionProps) {
  const chartView = useMemo<DashboardChartView | null>(() => {
    if (!chart) return null;

    const title = adaptSummaryChartTitle(chart);
    const chartType = String(chart.type).toLowerCase();

    if (chartType === "bar") {
      return {
        type: "bar" as const,
        title,
        data: adaptSummaryChartToBarData(chart),
        referenceLine: chart.referenceLine,
      };
    }

    if (chartType === "pie") {
      return {
        type: "pie" as const,
        title,
        data: adaptSummaryChartToPieData(chart),
      };
    }

    if (chartType === "scatter") {
      return {
        type: "scatter",
        title,
        chart,
      };
    }

    return {
      type: "unsupported",
      rawType: chart.type,
    };
  }, [chart]);

  if (isLoading) {
    return (
      <div className="h-[380px] rounded-[10px] bg-white shadow-sm animate-pulse" />
    );
  }

  if (isError) {
    return (
      <div className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-red-500">
          No se pudo cargar los datos del grafico.
        </p>
      </div>
    );
  }

  if (!chartView) {
    return (
      <div className="rounded-[10px] bg-white p-6 shadow-sm">
        <p
          className="text-[16px]"
          style={{ color: "var(--color-gray)" }}
        >
          No hay datos graficos disponibles.
        </p>
      </div>
    );
  }

  if (chartView.type === "bar") {
    return (
      <CustomBarChart
        title={chartView.title}
        data={chartView.data}
        chartHeight={height}
        referenceLine={chartView.referenceLine}
        showAverageLine={false}
      />
    );
  }

  if (chartView.type === "pie") {
    return (
      <CustomPieChart
        title={chartView.title}
        data={chartView.data}
        chartHeight={height}
      />
    );
  }

  if (chartView.type === "scatter") {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <h2
          className="mb-4 text-[20px] font-semibold"
          style={{ color: "var(--color-blue)" }}
        >
          {chartView.title}
        </h2>

        <DashboardScatterChart chart={chartView.chart} height={height} />
      </section>
    );
  }

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-sm">
      <p
        className="text-[16px]"
        style={{ color: "var(--color-gray)" }}
      >
        Tipo de grafico no soportado: {String(chartView.rawType)}
      </p>
    </div>
  );
}
