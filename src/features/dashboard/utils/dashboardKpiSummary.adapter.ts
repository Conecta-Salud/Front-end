// src/features/dashboard/utils/dashboardKpiSummary.adapter.ts

import type { DashboardKpi } from "../types/dashboardSummary.types";
import { formatDashboardKpiValue } from "./dashboardValueFormatters";
import { dashboardKpiVariantOverrides } from "../constants/dashboardKpiStyle.config";
import { dashboardKpiLabelsEs } from "../constants/dashboardText.es";


export type DashboardKpiCardItem = {
  id: string;
  title: string;
  titleSecondLine?: string;
  value: string | number;
  variant: "default" | "green" | "red";
};

function getKpiDisplayLabel(kpi: DashboardKpi) {
  return dashboardKpiLabelsEs[kpi.id] ?? kpi.label;
}

function splitKpiLabel(label: string) {
  const cleanLabel = label.trim();

  if (cleanLabel.length <= 24) {
    return {
      title: cleanLabel,
      titleSecondLine: undefined,
    };
  }

  const words = cleanLabel.split(" ");
  const middleIndex = Math.ceil(words.length / 2);

  return {
    title: words.slice(0, middleIndex).join(" "),
    titleSecondLine: words.slice(middleIndex).join(" "),
  };
}

export function adaptSummaryKpisToCards(kpis: DashboardKpi[] = []) {
  return [...kpis]
    .sort((a, b) => a.order - b.order)
    .map<DashboardKpiCardItem>((kpi) => {
      const displayLabel = getKpiDisplayLabel(kpi);
      const labelParts = splitKpiLabel(displayLabel)

      return {
        id: kpi.id,
        title: labelParts.title,
        titleSecondLine: labelParts.titleSecondLine,
        value: formatDashboardKpiValue(kpi),
        variant: dashboardKpiVariantOverrides[kpi.id] ?? kpi.variant ?? "default",      };
    });
}