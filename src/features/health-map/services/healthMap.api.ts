import api from "../../../services/api";
import type {
  HealthMapIndicator,
  HealthMapIndicatorResponse,
  RawGeoJsonFeatureCollection,
} from "../types/healthMap.types";

const isJsonContentType = (contentType: string) => {
  return (
    contentType.includes("application/json") ||
    contentType.includes("+json")
  );
};

export async function fetchStatesGeoJson(signal?: AbortSignal) {
  const response = await fetch("/geo/mexico-states.geojson", { signal });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok || !isJsonContentType(contentType)) {
    throw new Error("Could not load states GeoJSON.");
  }

  return response.json() as Promise<RawGeoJsonFeatureCollection>;
}

export async function fetchMunicipalitiesGeoJson(
  stateCode: string,
  signal?: AbortSignal
) {
  const response = await fetch(`/geo/municipalities/${stateCode}.geojson`, {
    signal,
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok || !isJsonContentType(contentType)) {
    throw new Error(
      `Could not load municipalities GeoJSON for state ${stateCode}.`
    );
  }

  return response.json() as Promise<RawGeoJsonFeatureCollection>;
}

export async function fetchStateMapIndicators(params: {
  indicator: HealthMapIndicator;
  year: string;
  signal?: AbortSignal;
}) {
  const response = await api.get<unknown>("/api/v1/map/states", {
    signal: params.signal,
    params: {
      indicator: params.indicator,
      year: params.year,
    },
  });

  if (!Array.isArray(response.data)) {
    throw new Error("Invalid state map indicators response.");
  }

  return response.data as HealthMapIndicatorResponse[];
}

export async function fetchMunicipalityMapIndicators(params: {
  stateCode: string;
  indicator: HealthMapIndicator;
  year: string;
  signal?: AbortSignal;
}) {
  const response = await api.get<unknown>("/api/v1/map/municipalities", {
    signal: params.signal,
    params: {
      stateCode: params.stateCode,
      indicator: params.indicator,
      year: params.year,
    },
  });

  if (!Array.isArray(response.data)) {
    throw new Error("Invalid municipality map indicators response.");
  }

  return response.data as HealthMapIndicatorResponse[];
}
