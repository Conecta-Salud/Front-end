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

export async function fetchStatesGeoJson() {
  const response = await fetch("/geo/mexico-states.geojson");

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok || !isJsonContentType(contentType)) {
    throw new Error("Could not load states GeoJSON.");
  }

  return response.json() as Promise<RawGeoJsonFeatureCollection>;
}

export async function fetchMunicipalitiesGeoJson(stateCode: string) {
  const response = await fetch(`/geo/municipalities/${stateCode}.geojson`);

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
}) {
  const response = await api.get<unknown>("/api/v1/map/states", {
    params: {
      indicator: params.indicator,
      year: params.year,
    },
  });

  if (!Array.isArray(response.data)) {
    console.error("Invalid state map indicators response:", response.data);
    return [];
  }

  return response.data as HealthMapIndicatorResponse[];
}

export async function fetchMunicipalityMapIndicators(params: {
  stateCode: string;
  indicator: HealthMapIndicator;
  year: string;
}) {
  const response = await api.get<unknown>("/api/v1/map/municipalities", {
    params: {
      stateCode: params.stateCode,
      indicator: params.indicator,
      year: params.year,
    },
  });

  if (!Array.isArray(response.data)) {
    console.error("Invalid municipality map indicators response:", response.data);
    return [];
  }

  return response.data as HealthMapIndicatorResponse[];
}
