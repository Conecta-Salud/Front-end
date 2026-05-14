import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchDashboardSummary } from "../services/dashboardSummary.api";
import type { DashboardSummaryRequest } from "../types/dashboardSummary.types";

export const dashboardSummaryQueryKeys = {
  all: ["dashboard-summary"] as const,

  summary: (params: {
    level: DashboardSummaryRequest["level"];
    stateId?: number | null;
    municipalityId?: number | null;
    periodId?: number | null;
    category?: DashboardSummaryRequest["category"];
  }) =>
    [
      ...dashboardSummaryQueryKeys.all,
      params.level,
      params.stateId ?? "no-state",
      params.municipalityId ?? "no-municipality",
      params.periodId ?? "no-period",
      params.category ?? "no-category",
    ] as const,
};

export function useDashboardSummaryQuery(params: {
  level: DashboardSummaryRequest["level"];
  stateId?: number | null;
  municipalityId?: number | null;
  periodId?: number | null;
  category: DashboardSummaryRequest["category"];
  enabled?: boolean;
}) {
  const canRun =
    Boolean(params.periodId) &&
    Boolean(params.category) &&
    (params.level === "country" ||
      (params.level === "state" && Boolean(params.stateId)) ||
      (params.level === "municipality" && Boolean(params.municipalityId)));

  return useQuery({
    queryKey: dashboardSummaryQueryKeys.summary(params),
    queryFn: () =>
      fetchDashboardSummary({
        level: params.level,
        stateId: params.stateId,
        municipalityId: params.municipalityId,
        periodId: params.periodId as number,
        category: params.category,
      }),
    enabled: canRun && (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}