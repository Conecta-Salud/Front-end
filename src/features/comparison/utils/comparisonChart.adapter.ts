import type {
  ComparisonChart,
  ComparisonChartDataPoint,
  ComparisonVariant,
} from "../types/comparisonSummary.types";

export type ComparisonChartViewData = {
  label: string;
  subtitle?: string;
  value: number;
  tone?: ComparisonVariant;
};

export type ComparisonChartAvailabilityState =
  | "available"
  | "partial"
  | "unavailable"
  | "empty";

export const isFiniteNumber = (value: unknown): value is number => {
  return typeof value === "number" && Number.isFinite(value);
};

const titleTranslations: Record<string, string> = {
  "Medical coverage": "Cobertura médica",
  "Estimated doctor deficit": "Déficit estimado de médicos",
  "Hospital beds per 1,000 inhabitants":
    "Camas hospitalarias por 1,000 habitantes",
  "Population in poverty": "Población en pobreza",
  "Healthcare access deficiency": "Carencia por acceso a servicios de salud",
  "Poverty population": "Población en situación de pobreza",
  "Hospital beds coverage": "Cobertura de camas hospitalarias",
};

const referenceTranslations: Record<string, string> = {
  "Minimum reference / 2.7": "Referencia mínima / 2.7",
  "Minimum reference / 3.0": "Referencia mínima / 3.0",
};

export function translateComparisonChartTitle(title: string) {
  return titleTranslations[title] ?? title;
}

export function adaptComparisonChartData(
  data: ComparisonChartDataPoint[] = []
): ComparisonChartViewData[] {
  return data.reduce<ComparisonChartViewData[]>((acc, point) => {
    if (!isFiniteNumber(point.value)) {
      return acc;
    }

    acc.push({
      label: point.label,
      subtitle: point.subtitle,
      value: point.value,
      tone: point.variant,
    });

    return acc;
  }, []);
}

export function getComparisonChartAvailabilityState(
  chart: ComparisonChart
): ComparisonChartAvailabilityState {
  const data = chart.data ?? [];

  if (!data.length) {
    return "empty";
  }

  const validPoints = data.filter((point) => isFiniteNumber(point.value));

  if (!validPoints.length) {
    return "unavailable";
  }

  if (validPoints.length < data.length) {
    return "partial";
  }

  return "available";
}

export function hasUnavailableComparisonChartData(chart: ComparisonChart) {
  return getComparisonChartAvailabilityState(chart) !== "available";
}

export function hasUnavailableComparisonCharts(
  charts: ComparisonChart[] = []
) {
  return charts.some(hasUnavailableComparisonChartData);
}

export function adaptComparisonReferenceLine(chart: ComparisonChart) {
  if (!chart.referenceLine || !isFiniteNumber(chart.referenceLine.value)) {
    return undefined;
  }

  return {
    value: chart.referenceLine.value,
    label:
      referenceTranslations[chart.referenceLine.label] ??
      chart.referenceLine.label,
  };
}
