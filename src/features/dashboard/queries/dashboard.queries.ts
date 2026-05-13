import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchCountryDashboardHealth,
  fetchCountryDashboardIndicators,
  fetchMunicipalityDashboardHealth,
  fetchMunicipalityDashboardIndicators,
  fetchStateDashboardHealth,
  fetchStateDashboardIndicators,
} from "../services/dashboard.api";

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,

  country: (periodId: number | null | undefined) =>
    [...dashboardQueryKeys.all, "country", periodId] as const,

  countryIndicators: (periodId: number | null | undefined) =>
    [...dashboardQueryKeys.country(periodId), "indicators"] as const,

  countryHealth: (periodId: number | null | undefined) =>
    [...dashboardQueryKeys.country(periodId), "health"] as const,

  state: (
    stateId: number | null | undefined,
    periodId: number | null | undefined
  ) => [...dashboardQueryKeys.all, "state", stateId, periodId] as const,

  municipality: (
    municipalityId: number | null | undefined,
    periodId: number | null | undefined
  ) =>
    [
      ...dashboardQueryKeys.all,
      "municipality",
      municipalityId,
      periodId,
    ] as const,

  stateIndicators: (
    stateId: number | null | undefined,
    periodId: number | null | undefined
  ) => [...dashboardQueryKeys.state(stateId, periodId), "indicators"] as const,

  stateHealth: (
    stateId: number | null | undefined,
    periodId: number | null | undefined
  ) => [...dashboardQueryKeys.state(stateId, periodId), "health"] as const,

  municipalityIndicators: (
    municipalityId: number | null | undefined,
    periodId: number | null | undefined
  ) =>
    [
      ...dashboardQueryKeys.municipality(municipalityId, periodId),
      "indicators",
    ] as const,

  municipalityHealth: (
    municipalityId: number | null | undefined,
    periodId: number | null | undefined
  ) =>
    [
      ...dashboardQueryKeys.municipality(municipalityId, periodId),
      "health",
    ] as const,
};

export function useCountryDashboardIndicatorsQuery(params: {
  periodId: number | null | undefined;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: dashboardQueryKeys.countryIndicators(params.periodId),
    queryFn: () =>
      fetchCountryDashboardIndicators({
        periodId: params.periodId as number,
      }),
    enabled: Boolean(params.periodId) && (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

export function useCountryDashboardHealthQuery(params: {
  periodId: number | null | undefined;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: dashboardQueryKeys.countryHealth(params.periodId),
    queryFn: () =>
      fetchCountryDashboardHealth({
        periodId: params.periodId as number,
      }),
    enabled: Boolean(params.periodId) && (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

export function useStateDashboardIndicatorsQuery(params: {
  stateId: number | null | undefined;
  periodId: number | null | undefined;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: dashboardQueryKeys.stateIndicators(params.stateId, params.periodId),
    queryFn: () =>
      fetchStateDashboardIndicators({
        stateId: params.stateId as number,
        periodId: params.periodId as number,
      }),
    enabled:
      Boolean(params.stateId) &&
      Boolean(params.periodId) &&
      (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

export function useStateDashboardHealthQuery(params: {
  stateId: number | null | undefined;
  periodId: number | null | undefined;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: dashboardQueryKeys.stateHealth(params.stateId, params.periodId),
    queryFn: () =>
      fetchStateDashboardHealth({
        stateId: params.stateId as number,
        periodId: params.periodId as number,
      }),
    enabled:
      Boolean(params.stateId) &&
      Boolean(params.periodId) &&
      (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

export function useMunicipalityDashboardIndicatorsQuery(params: {
  municipalityId: number | null | undefined;
  periodId: number | null | undefined;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: dashboardQueryKeys.municipalityIndicators(
      params.municipalityId,
      params.periodId
    ),
    queryFn: () =>
      fetchMunicipalityDashboardIndicators({
        municipalityId: params.municipalityId as number,
        periodId: params.periodId as number,
      }),
    enabled:
      Boolean(params.municipalityId) &&
      Boolean(params.periodId) &&
      (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

export function useMunicipalityDashboardHealthQuery(params: {
  municipalityId: number | null | undefined;
  periodId: number | null | undefined;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: dashboardQueryKeys.municipalityHealth(
      params.municipalityId,
      params.periodId
    ),
    queryFn: () =>
      fetchMunicipalityDashboardHealth({
        municipalityId: params.municipalityId as number,
        periodId: params.periodId as number,
      }),
    enabled:
      Boolean(params.municipalityId) &&
      Boolean(params.periodId) &&
      (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}