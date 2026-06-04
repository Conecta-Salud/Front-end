import api from "../../../services/api";
import type {
  DataAvailabilityFilters,
  DataAvailabilityResponse,
} from "../types/dataAvailability.types";

export type FetchDataAvailabilityParams = DataAvailabilityFilters & {
  signal?: AbortSignal;
};

export async function fetchDataAvailability({
  territoryLevel,
  analysisYear,
  categoryCode,
  signal,
}: FetchDataAvailabilityParams = {}) {
  const response = await api.get<DataAvailabilityResponse>(
    "/api/v1/data-availability",
    {
      signal,
      params: {
        territoryLevel,
        analysisYear,
        categoryCode,
      },
    }
  );

  return {
    years: Array.isArray(response.data.years) ? response.data.years : [],
    items: Array.isArray(response.data.items) ? response.data.items : [],
  } satisfies DataAvailabilityResponse;
}
