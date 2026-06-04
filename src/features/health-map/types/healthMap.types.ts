import type { Feature, FeatureCollection, Geometry } from "geojson";
import type {
  AvailabilityStatus,
  DashboardCategory,
  TerritoryLevel,
} from "../../shared/types/apiContracts.types";

export type HealthMapViewLevel = TerritoryLevel;

export type HealthMapIndicator = DashboardCategory;

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
  sourceYear?: number | null;
  unit?: string | null;
  availabilityStatus?: AvailabilityStatus | string | null;
  methodologyNote?: string | null;
  dataSourceName?: string | null;
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

export type HealthMapNavigationState = {
  level: HealthMapViewLevel;
  selectedState: {
    code: string;
    name: string;
  } | null;
  selectedMunicipality?: {
    code: string;
    name: string;
  } | null;
};
