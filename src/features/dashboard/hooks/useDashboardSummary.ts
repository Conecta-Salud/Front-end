import type { HealthMapIndicator } from "../../health-map/types/healthMap.types";
import type { DashboardScope } from "./useDashboardScope";
import { useDashboardSummaryQuery } from "../queries/dashboardSummary.queries";

type UseDashboardSummaryParams = {
  scope: DashboardScope;
  category: HealthMapIndicator;
  enabled?: boolean;
};

export function useDashboardSummary({
  scope,
  category,
  enabled = true,
}: UseDashboardSummaryParams) {
  const query = useDashboardSummaryQuery({
    level: scope.level,
    stateId: scope.stateId,
    municipalityId: scope.municipalityId,
    periodId: scope.periodId,
    category,
    enabled: scope.isReady && enabled,
  });

  return {
    summary: query.data,
    isLoading: scope.isLoading || query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
  };
}
