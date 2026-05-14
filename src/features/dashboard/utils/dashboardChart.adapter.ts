import type {
  DashboardChart,
  DashboardChartDataPoint,
} from "../types/dashboardSummary.types";
import {
  translateDashboardChartTitle,
  translateDashboardDataLabel,
} from "./dashboardTranslation.utils";
import type { ChartData } from "../../../components/charts/BarChart/BarChart";
import type { PieChartDataItem } from "../../../components/charts/PieChart/PieChart";

export type DashboardScatterChartData = {
  label: string;
  x: number;
  y: number;
  code?: string;
  colorToken?: "green" | "yellow" | "red" | "neutral";
};

export function adaptSummaryChartTitle(chart?: DashboardChart) {
  if (!chart?.title) return "";
  return translateDashboardChartTitle(chart.title);
}

export function adaptSummaryChartToBarData(
  chart?: DashboardChart
): ChartData[] {
  if (!chart?.data?.length) return [];

  return chart.data
    .filter((point) => typeof point.value === "number")
    .map((point) => {
      const rawPoint = point as DashboardChartDataPoint & {
        name?: string;
      };

      const label = rawPoint.label ?? rawPoint.name ?? "Unknown";

      return {
        label: translateDashboardDataLabel(label),
        value: rawPoint.value as number,
        colorToken: rawPoint.colorToken,
      };
    });
}

export function adaptSummaryChartToPieData(
  chart?: DashboardChart
): PieChartDataItem[] {
  if (!chart?.data?.length) return [];

  return chart.data
    .filter((point) => typeof point.value === "number")
    .map((point) => {
      const rawPoint = point as DashboardChartDataPoint & {
        name?: string;
      };

      const label = rawPoint.label ?? rawPoint.name ?? "Unknown";

      return {
        label: translateDashboardDataLabel(label),
        value: rawPoint.value as number,
        colorToken: rawPoint.colorToken,
      };
    });
}

export function adaptSummaryChartToScatterData(
  chart?: DashboardChart
): DashboardScatterChartData[] {
  if (!chart?.data?.length || !chart.xKey || !chart.yKey) return [];

  return chart.data.reduce<DashboardScatterChartData[]>((acc, point) => {
    const x = point[chart.xKey as keyof DashboardChartDataPoint];
    const y = point[chart.yKey as keyof DashboardChartDataPoint];

    if (typeof x !== "number" || typeof y !== "number") {
      return acc;
    }

    acc.push({
      label: translateDashboardDataLabel(point.label),
      x,
      y,
      ...(point.code ? { code: point.code } : {}),
      ...(point.colorToken ? { colorToken: point.colorToken } : {}),
    });

    return acc;
  }, []);
}