// src/features/dashboard/utils/dashboardKpiSummary.adapter.ts

import type { DashboardKpi } from "../types/dashboardSummary.types";

import { formatDashboardKpiValue } from "./dashboardValueFormatters";
import { dashboardKpiDisplayConfig } from "../constants/dashboardKpiDisplay.config";

export type DashboardKpiCardItem = {
  id: string;
  title: string;
  titleSecondLine?: string;
  value: string | number;
  variant: "default" | "green" | "red";
};

function toSupportedKpiVariant(variant?: DashboardKpi["variant"]) {
  if (variant === "green" || variant === "red") {
    return variant;
  }

  return "default";
}

function splitKpiLabelFallback(label: string) {
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
      const displayConfig = dashboardKpiDisplayConfig[kpi.id];
      const fallbackLabel = splitKpiLabelFallback(kpi.label);

      return {
        id: kpi.id,
        title: displayConfig?.title ?? fallbackLabel.title,
        titleSecondLine:
          displayConfig?.titleSecondLine ?? fallbackLabel.titleSecondLine,
        value: formatDashboardKpiValue(kpi),
        variant: toSupportedKpiVariant(displayConfig?.variant ?? kpi.variant),
      };
    });
}
