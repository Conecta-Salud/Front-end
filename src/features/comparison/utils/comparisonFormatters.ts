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

export function formatComparisonChartValue(
  chartId: ComparisonChartId,
  value: number
) {
  if (chartId === "poverty_rate") {
    return `${decimalFormatter.format(value)}%`;
  }

  return decimalFormatter.format(value);
}

export function formatPriorityScore(score: number) {
  return decimalFormatter.format(score);
}

export function formatPriorityFactorValue(factor: ComparisonPriorityFactor) {
  if (factor.unit === "percentage") {
    return `${decimalFormatter.format(factor.value)}%`;
  }

  if (factor.unit === "doctors_per_1000") {
    return `${decimalFormatter.format(factor.value)} médicos / 1,000 hab.`;
  }

  if (factor.unit === "hospitals_per_100k") {
    return `${decimalFormatter.format(factor.value)} hospitales / 100k hab.`;
  }

  return integerFormatter.format(factor.value);
}