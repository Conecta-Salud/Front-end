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

type CatalogQueryOptions = {
  enabled?: boolean;
};

export function useStatesCatalogQuery(options?: CatalogQueryOptions) {
  return useQuery({
    queryKey: catalogQueryKeys.states(),
    queryFn: fetchStatesCatalog,
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function useMunicipalitiesCatalogQuery(options?: CatalogQueryOptions) {
  return useQuery({
    queryKey: catalogQueryKeys.municipalities(),
    queryFn: fetchMunicipalitiesCatalog,
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function usePeriodsCatalogQuery(options?: CatalogQueryOptions) {
  return useQuery({
    queryKey: catalogQueryKeys.periods(),
    queryFn: fetchPeriodsCatalog,
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}