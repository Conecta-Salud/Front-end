import { useQuery } from "@tanstack/react-query";
import { fetchDataAvailability } from "../services/dataAvailability.api";
import type { DataAvailabilityFilters } from "../types/dataAvailability.types";

export const DATA_AVAILABILITY_STALE_TIME_MS = 1000 * 60 * 30;

export const dataAvailabilityQueryKeys = {
  all: ["data-availability"] as const,

  list: (filters: DataAvailabilityFilters = {}) =>
    [
      ...dataAvailabilityQueryKeys.all,
      filters.territoryLevel ?? "all-levels",
      filters.analysisYear ?? "all-years",
      filters.categoryCode ?? "all-categories",
    ] as const,
};

type UseDataAvailabilityQueryParams = DataAvailabilityFilters & {
  enabled?: boolean;
};

export function useDataAvailabilityQuery(
  params: UseDataAvailabilityQueryParams = {}
) {
  const { enabled = true, ...filters } = params;

  return useQuery({
    queryKey: dataAvailabilityQueryKeys.list(filters),
    queryFn: ({ signal }) =>
      fetchDataAvailability({
        ...filters,
        signal,
      }),
    enabled,
    staleTime: DATA_AVAILABILITY_STALE_TIME_MS,
  });
}
