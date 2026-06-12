export type TerritoryLevel = "country" | "state" | "municipality";

export type AvailabilityStatus =
  | "available"
  | "partial"
  | "not_available"
  | "not_applicable"
  | "estimated";

export type UploadStatus =
  | "pending"
  | "processing"
  | "completed"
  | "warning"
  | "error";

export type ProcessingMode =
  | "validate_only"
  | "upsert"
  | "replace";

export type UploadSourceType =
  | "population"
  | "health_establishments"
  | "health_sectorial";

export type CsvFileRole =
  | "population_municipal_base"
  | "population_state_national_indicators"
  | "establishments_catalog"
  | "sectorial_data";

export type DashboardCategory =
  | "medical_coverage"
  | "hospital_beds"
  | "healthcare_access_deficiency";
