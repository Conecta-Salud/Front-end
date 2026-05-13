import { useMemo } from "react";
import type { DashboardScope } from "./useDashboardScope";
import {
  useCountryDashboardHealthQuery,
  useCountryDashboardIndicatorsQuery,
  useMunicipalityDashboardHealthQuery,
  useMunicipalityDashboardIndicatorsQuery,
  useStateDashboardHealthQuery,
  useStateDashboardIndicatorsQuery,
} from "../queries/dashboard.queries";
import { buildDashboardKpis } from "../utils/dashboardKpi.adapter";

type UseDashboardKpisParams = {
  scope: DashboardScope;
};

export function useDashboardKpis({ scope }: UseDashboardKpisParams) {
  const countryIndicatorsQuery = useCountryDashboardIndicatorsQuery({
    periodId: scope.periodId,
    enabled: scope.level === "country" && scope.isReady,
  });

  const countryHealthQuery = useCountryDashboardHealthQuery({
    periodId: scope.periodId,
    enabled: scope.level === "country" && scope.isReady,
  });

  const stateIndicatorsQuery = useStateDashboardIndicatorsQuery({
    stateId: scope.stateId,
    periodId: scope.periodId,
    enabled: scope.level === "state" && scope.isReady,
  });

  const stateHealthQuery = useStateDashboardHealthQuery({
    stateId: scope.stateId,
    periodId: scope.periodId,
    enabled: scope.level === "state" && scope.isReady,
  });

  const municipalityIndicatorsQuery = useMunicipalityDashboardIndicatorsQuery({
    municipalityId: scope.municipalityId,
    periodId: scope.periodId,
    enabled: scope.level === "municipality" && scope.isReady,
  });

  const municipalityHealthQuery = useMunicipalityDashboardHealthQuery({
    municipalityId: scope.municipalityId,
    periodId: scope.periodId,
    enabled: scope.level === "municipality" && scope.isReady,
  });

  const activeIndicatorsResponse =
    scope.level === "country"
      ? countryIndicatorsQuery.data
      : scope.level === "state"
      ? stateIndicatorsQuery.data
      : municipalityIndicatorsQuery.data;

  const activeHealthResponse =
    scope.level === "country"
      ? countryHealthQuery.data
      : scope.level === "state"
      ? stateHealthQuery.data
      : municipalityHealthQuery.data;

  const activeIndicatorsQuery =
    scope.level === "country"
      ? countryIndicatorsQuery
      : scope.level === "state"
      ? stateIndicatorsQuery
      : municipalityIndicatorsQuery;

  const activeHealthQuery =
    scope.level === "country"
      ? countryHealthQuery
      : scope.level === "state"
      ? stateHealthQuery
      : municipalityHealthQuery;

  const kpis = useMemo(
    () =>
      buildDashboardKpis({
        healthResponse: activeHealthResponse,
        indicatorsResponse: activeIndicatorsResponse,
      }),
    [activeHealthResponse, activeIndicatorsResponse]
  );

  return {
    kpis,
    healthResponse: activeHealthResponse,
    indicatorsResponse: activeIndicatorsResponse,
    isLoading:
      scope.isLoading ||
      activeIndicatorsQuery.isLoading ||
      activeHealthQuery.isLoading,
    isFetching:
      activeIndicatorsQuery.isFetching || activeHealthQuery.isFetching,
    isError: activeIndicatorsQuery.isError || activeHealthQuery.isError,
    error: activeIndicatorsQuery.error || activeHealthQuery.error,
  };
}