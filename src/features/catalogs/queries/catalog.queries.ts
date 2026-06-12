import { useQuery } from "@tanstack/react-query";
import {
  fetchMunicipalitiesCatalog,
  fetchPeriodsCatalog,
  fetchStatesCatalog,
  fetchDepartmentsCatalog,
} from "../services/catalog.api";

export const catalogQueryKeys = {
  all: ["catalogs"] as const,

  states: () => [...catalogQueryKeys.all, "states"] as const,

  municipalities: (stateId?: number | null) =>
    [...catalogQueryKeys.all, "municipalities", stateId ?? "all"] as const,

  periods: () => [...catalogQueryKeys.all, "periods"] as const,

  departments: () => [...catalogQueryKeys.all, "departments"] as const,
};

type CatalogQueryOptions = {
  enabled?: boolean;
};

type MunicipalitiesCatalogQueryOptions = CatalogQueryOptions & {
  stateId?: number;
};

export function useStatesCatalogQuery(options?: CatalogQueryOptions) {
  return useQuery({
    queryKey: catalogQueryKeys.states(),
    queryFn: ({ signal }) => fetchStatesCatalog(signal),
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function useMunicipalitiesCatalogQuery(
  options?: MunicipalitiesCatalogQueryOptions
) {
  return useQuery({
    queryKey: catalogQueryKeys.municipalities(options?.stateId),
    queryFn: ({ signal }) =>
      fetchMunicipalitiesCatalog({
        stateId: options?.stateId,
        signal,
      }),
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function usePeriodsCatalogQuery(options?: CatalogQueryOptions) {
  return useQuery({
    queryKey: catalogQueryKeys.periods(),
    queryFn: ({ signal }) => fetchPeriodsCatalog(signal),
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function useDepartmentsCatalogQuery(options?: CatalogQueryOptions) {
  return useQuery({
    queryKey: catalogQueryKeys.departments(),
    queryFn: ({ signal }) => fetchDepartmentsCatalog(signal),
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
