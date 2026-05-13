import { useQuery } from "@tanstack/react-query";
import {
  fetchMunicipalitiesCatalog,
  fetchPeriodsCatalog,
  fetchStatesCatalog,
} from "../services/catalog.api";

export const catalogQueryKeys = {
  all: ["catalogs"] as const,

  states: () => [...catalogQueryKeys.all, "states"] as const,

  municipalities: () =>
    [...catalogQueryKeys.all, "municipalities"] as const,

  periods: () => [...catalogQueryKeys.all, "periods"] as const,
};

export function useStatesCatalogQuery() {
  return useQuery({
    queryKey: catalogQueryKeys.states(),
    queryFn: fetchStatesCatalog,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function useMunicipalitiesCatalogQuery() {
  return useQuery({
    queryKey: catalogQueryKeys.municipalities(),
    queryFn: fetchMunicipalitiesCatalog,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function usePeriodsCatalogQuery() {
  return useQuery({
    queryKey: catalogQueryKeys.periods(),
    queryFn: fetchPeriodsCatalog,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}