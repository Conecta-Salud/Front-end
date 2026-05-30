import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "../services/locationSearch.api";

export const locationSearchQueryKeys = {
  all: ["locations"] as const,
  search: (query: string, limit: number) =>
    [...locationSearchQueryKeys.all, "search", query, limit] as const,
};

type UseLocationSearchQueryParams = {
  query: string;
  limit?: number;
  enabled?: boolean;
};

export function useLocationSearchQuery({
  query,
  limit = 10,
  enabled = true,
}: UseLocationSearchQueryParams) {
  const cleanQuery = query.trim();

  return useQuery({
    queryKey: locationSearchQueryKeys.search(cleanQuery, limit),
    queryFn: ({ signal }) =>
      searchLocations({
        query: cleanQuery,
        limit,
        signal,
      }),
    enabled: enabled && cleanQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    retry: false,
  });
}