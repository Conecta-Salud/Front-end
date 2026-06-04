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

const MAX_PIE_CATEGORIES = 6;
const OTHER_PIE_LABEL = "Otros";

const isFiniteNumber = (value: unknown): value is number => {
  return typeof value === "number" && Number.isFinite(value);
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
    .filter((point) => isFiniteNumber(point.value))
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

  const data = chart.data
    .filter((point) => isFiniteNumber(point.value) && point.value > 0)
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

  if (data.length <= MAX_PIE_CATEGORIES) {
    return data;
  }

  const visibleCount = MAX_PIE_CATEGORIES - 1;
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const visibleData = sortedData.slice(0, visibleCount);
  const otherValue = sortedData
    .slice(visibleCount)
    .reduce((sum, item) => sum + item.value, 0);

  if (otherValue <= 0) {
    return visibleData;
  }

  return [
    ...visibleData,
    {
      label: OTHER_PIE_LABEL,
      value: otherValue,
      colorToken: "neutral",
    },
  ];
}

export function adaptSummaryChartToScatterData(
  chart?: DashboardChart
): DashboardScatterChartData[] {
  if (!chart?.data?.length || !chart.xKey || !chart.yKey) return [];

  return chart.data.reduce<DashboardScatterChartData[]>((acc, point) => {
    const x = point[chart.xKey as keyof DashboardChartDataPoint];
    const y = point[chart.yKey as keyof DashboardChartDataPoint];

    if (!isFiniteNumber(x) || !isFiniteNumber(y)) {
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
