import type { DashboardKpi } from "../types/dashboardSummary.types";
import { translateDashboardValue } from "./dashboardTranslation.utils";

const numberFormatter = new Intl.NumberFormat("en-US");

const decimalFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const technicalUnits = new Set([
  "count",
  "doctors_per_1000",
  "hospital_beds_per_1000",
  "percentage",
  "percent",
  "population",
  "doctors",
  "hospital_beds",
  "consulting_rooms",
]);

export function formatDashboardNumber(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "N/A";
  }

  if (Number.isInteger(value)) {
    return numberFormatter.format(value);
  }

  return decimalFormatter.format(value);
}

export function formatDashboardKpiValue(kpi: DashboardKpi) {
  if (kpi.value === null || kpi.value === undefined) {
    if (kpi.unit && !technicalUnits.has(kpi.unit)) {
      const translatedValue = translateDashboardValue(kpi.unit);

      return typeof translatedValue === "string"
        ? translatedValue
        : formatTextValue(kpi.unit);
    }

    return "N/A";
  }

  if (
    kpi.unit === "percentage" ||
    kpi.unit === "percent" ||
    kpi.id.includes("percentage")
  ) {
    return `${decimalFormatter.format(kpi.value)}%`;
  }

  return formatDashboardNumber(kpi.value);
}

export function formatTextValue(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/^\w/, (letter) => letter.toUpperCase());
}