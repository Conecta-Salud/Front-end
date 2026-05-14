import {
  dashboardChartLabelsEs,
  dashboardChartTitlesEs,
  dashboardRankingColumnLabelsEs,
  dashboardRankingTitlesEs,
  dashboardValueLabelsEs,
} from "../constants/dashboardText.es";

const normalizeText = (value: string) => value.trim();

export function translateDashboardRankingTitle(title: string) {
  return dashboardRankingTitlesEs[normalizeText(title)] ?? title;
}

export function translateDashboardChartTitle(title: string) {
  return dashboardChartTitlesEs[normalizeText(title)] ?? title;
}

export function translateDashboardColumnLabel(key: string, label: string) {
  return dashboardRankingColumnLabelsEs[key] ?? label;
}

export function translateDashboardDataLabel(label: string) {
  const cleanLabel = normalizeText(label);

  return (
    dashboardChartLabelsEs[cleanLabel] ??
    dashboardChartLabelsEs[cleanLabel.toLowerCase()] ??
    label
  );
}

export function translateDashboardValue(value: unknown) {
  if (typeof value !== "string") return value;

  const cleanValue = normalizeText(value);

  return (
    dashboardValueLabelsEs[cleanValue] ??
    dashboardValueLabelsEs[cleanValue.toLowerCase()] ??
    dashboardChartLabelsEs[cleanValue] ??
    dashboardChartLabelsEs[cleanValue.toLowerCase()] ??
    value
  );
}