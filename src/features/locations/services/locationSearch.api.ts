import api from "../../../services/api";
import type { LocationSearchResult } from "../types/locationSearch.types";

type SearchLocationsParams = {
  query: string;
  limit?: number;
  signal?: AbortSignal;
};

export async function searchLocations({
  query,
  limit = 10,
  signal,
}: SearchLocationsParams): Promise<LocationSearchResult[]> {
  const cleanQuery = query.trim();

  if (cleanQuery.length < 2) {
    return [];
  }

  const response = await api.get<LocationSearchResult[]>("/locations/search", {
    params: {
      q: cleanQuery,
      limit,
    },
    signal,
  });

  return response.data;
}