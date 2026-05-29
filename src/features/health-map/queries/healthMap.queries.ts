import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchMunicipalitiesGeoJson,
  fetchMunicipalityMapIndicators,
  fetchStateMapIndicators,
  fetchStatesGeoJson,
} from "../services/healthMap.api";
import type { HealthMapIndicator } from "../types/healthMap.types";
import { normalizeGeoJson } from "../utils/healthMap.utils";

export const healthMapQueryKeys = {
  all: ["health-map"] as const,

  geoJson: () => [...healthMapQueryKeys.all, "geojson"] as const,

  statesGeoJson: () =>
    [...healthMapQueryKeys.geoJson(), "states"] as const,

  municipalitiesGeoJson: (stateCode: string | null | undefined) =>
    [...healthMapQueryKeys.geoJson(), "municipalities", stateCode] as const,

  indicators: () => [...healthMapQueryKeys.all, "indicators"] as const,

  stateIndicators: (params: {
    indicator: HealthMapIndicator;
    year: string;
  }) =>
    [
      ...healthMapQueryKeys.indicators(),
      "states",
      params.indicator,
      params.year,
    ] as const,

  municipalityIndicators: (params: {
    stateCode: string | null | undefined;
    indicator: HealthMapIndicator;
    year: string;
  }) =>
    [
      ...healthMapQueryKeys.indicators(),
      "municipalities",
      params.stateCode,
      params.indicator,
      params.year,
    ] as const,
};

export function useStatesGeoJsonQuery() {
  return useQuery({
    queryKey: healthMapQueryKeys.statesGeoJson(),
    queryFn: ({ signal }) => fetchStatesGeoJson(signal),
    select: normalizeGeoJson,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function useMunicipalitiesGeoJsonQuery(
  stateCode: string | null | undefined
) {
  return useQuery({
    queryKey: healthMapQueryKeys.municipalitiesGeoJson(stateCode),
    queryFn: ({ signal }) =>
      fetchMunicipalitiesGeoJson(stateCode as string, signal),
    enabled: Boolean(stateCode),
    select: normalizeGeoJson,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function useStateMapIndicatorsQuery(params: {
  indicator: HealthMapIndicator;
  year: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: healthMapQueryKeys.stateIndicators({
      indicator: params.indicator,
      year: params.year,
    }),
    queryFn: ({ signal }) =>
      fetchStateMapIndicators({
        indicator: params.indicator,
        year: params.year,
        signal,
      }),
    enabled: params.enabled ?? true,
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}

export function useMunicipalityMapIndicatorsQuery(params: {
  stateCode: string | null | undefined;
  indicator: HealthMapIndicator;
  year: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: healthMapQueryKeys.municipalityIndicators({
      stateCode: params.stateCode,
      indicator: params.indicator,
      year: params.year,
    }),
    queryFn: ({ signal }) =>
      fetchMunicipalityMapIndicators({
        stateCode: params.stateCode as string,
        indicator: params.indicator,
        year: params.year,
        signal,
      }),
    enabled: Boolean(params.stateCode) && (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}
