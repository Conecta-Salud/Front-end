import type {
  ComparisonChartId,
  ComparisonPriorityFactor,
} from "../types/comparisonSummary.types";

const decimalFormatter = new Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat("es-MX", {
  maximumFractionDigits: 0,
});

const isFiniteNumber = (value: unknown): value is number => {
  return typeof value === "number" && Number.isFinite(value);
};

export function formatComparisonChartValue(
  chartId: ComparisonChartId,
  value: number
) {
  if (!isFiniteNumber(value)) {
    return "N/D";
  }

  if (chartId === "poverty_rate") {
    return `${decimalFormatter.format(value)}%`;
  }

  return decimalFormatter.format(value);
}

export function formatPriorityScore(score?: number | null) {
  if (!isFiniteNumber(score)) {
    return "N/D";
  }

  return decimalFormatter.format(score);
}

export function formatPriorityFactorValue(factor: ComparisonPriorityFactor) {
  const value = factor.value;

  if (!isFiniteNumber(value)) {
    return "N/D";
  }

  if (factor.unit === "percentage") {
    return `${decimalFormatter.format(value)}%`;
  }

  if (factor.unit === "doctors_per_1000") {
    return `${decimalFormatter.format(value)} médicos / 1,000 hab.`;
  }

  if (factor.unit === "hospitals_per_100k") {
    return `${decimalFormatter.format(value)} hospitales / 100k hab.`;
  }

  return integerFormatter.format(value);
}
