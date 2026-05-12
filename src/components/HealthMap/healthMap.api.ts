import api from "../../services/api";
import type {
  HealthMapIndicator,
  HealthMapIndicatorResponse,
  RawGeoJsonFeatureCollection,
} from "./healthMap.types";

export async function fetchStatesGeoJson() {
  const response = await fetch("/geo/mexico-states.geojson");

  if (!response.ok) {
    throw new Error("Could not load states GeoJSON.");
  }

  return response.json() as Promise<RawGeoJsonFeatureCollection>;
}

export async function fetchMunicipalitiesGeoJson(stateCode: string) {
  const response = await fetch(`/geo/municipalities/${stateCode}.geojson`);

  if (!response.ok) {
    throw new Error(`Could not load municipalities GeoJSON for state ${stateCode}.`);
  }

  return response.json() as Promise<RawGeoJsonFeatureCollection>;
}

export async function fetchStateMapIndicators(params: {
  indicator: HealthMapIndicator;
  year: string;
}) {
  const response = await api.get<HealthMapIndicatorResponse[]>("/api/v1/map/states", {
    params: {
      indicator: params.indicator,
      year: params.year,
    },
  });

  return response.data;
}

export async function fetchMunicipalityMapIndicators(params: {
  stateCode: string;
  indicator: HealthMapIndicator;
  year: string;
}) {
  const response = await api.get<HealthMapIndicatorResponse[]>(
    "/api/v1/map/municipalities",
    {
      params: {
        stateCode: params.stateCode,
        indicator: params.indicator,
        year: params.year,
      },
    }
  );

  return response.data;
}