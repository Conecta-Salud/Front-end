import type { Feature, FeatureCollection, Geometry } from "geojson";

export type MapViewLevel = "country" | "state";

export type HealthMapIndicator =
  | "medical_coverage"
  | "hospital_beds"
  | "healthcare_access_deficiency";

export type HealthMapStatusLevel =
  | "good"
  | "risk"
  | "critical"
  | "no_data";

export type HealthMapColorToken =
  | "green"
  | "yellow"
  | "red"
  | "neutral";

export type HealthMapIndicatorResponse = {
  code: string;
  name: string;
  value: number | null;
  level: HealthMapStatusLevel;
  colorToken: HealthMapColorToken;
};

export type HealthMapFeatureProperties = {
  code: string;
  name: string;
  stateCode?: string;
  municipalityCode?: string;
  indicator?: HealthMapIndicatorResponse;
};

export type HealthMapFeature = Feature<Geometry, HealthMapFeatureProperties>;

export type HealthMapFeatureCollection = FeatureCollection<
  Geometry,
  HealthMapFeatureProperties
>;

export type RawGeoJsonFeatureCollection = FeatureCollection<
  Geometry,
  Record<string, unknown>
>;

export type HealthMapClickPayload = {
  code: string;
  name: string;
  value: number | null;
  level: HealthMapStatusLevel;
  colorToken: HealthMapColorToken;
};

export type HealthMapSelectedTerritory = {
  type: "state" | "municipality";
  code: string;
  name: string;
  stateCode?: string;
};