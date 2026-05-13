import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";

import {
  fetchStatesGeoJson,
  fetchMunicipalitiesGeoJson,
  fetchStateMapIndicators,
  fetchMunicipalityMapIndicators,
} from "../services/healthMap.api";

import type { HealthMapIndicator } from "../types/healthMap.types";

export function useStatesGeoJsonQuery() {
  return useQuery({
    queryKey: queryKeys.healthMap.statesGeoJson(),
    queryFn: fetchStatesGeoJson,
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000,
  });
}

export function useMunicipalitiesGeoJsonQuery(stateCode?: string) {
  return useQuery({
    queryKey: queryKeys.healthMap.municipalitiesGeoJson(stateCode ?? ""),
    queryFn: () => fetchMunicipalitiesGeoJson(stateCode!),
    enabled: Boolean(stateCode),
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000,
  });
}

export function useStateMapIndicatorsQuery(params: {
  indicator: HealthMapIndicator;
  year: string;
}) {
  return useQuery({
    queryKey: queryKeys.healthMap.stateIndicators(params.indicator, params.year),
    queryFn: () => fetchStateMapIndicators(params),
    enabled: Boolean(params.indicator && params.year),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMunicipalityMapIndicatorsQuery(params: {
  stateCode?: string;
  indicator: HealthMapIndicator;
  year: string;
}) {
  return useQuery({
    queryKey: queryKeys.healthMap.municipalityIndicators(
      params.stateCode ?? "",
      params.indicator,
      params.year
    ),
    queryFn: () =>
      fetchMunicipalityMapIndicators({
        stateCode: params.stateCode!,
        indicator: params.indicator,
        year: params.year,
      }),
    enabled: Boolean(params.stateCode && params.indicator && params.year),
    staleTime: 5 * 60 * 1000,
  });
}