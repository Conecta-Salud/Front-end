import type { AvailabilityStatus } from "../../shared/types/apiContracts.types";

export type ComparisonLevel = "state" | "municipality";

export type ComparisonChartId =
  | "medical_coverage"
  | "doctor_deficit"
  | "hospital_beds_per_1000"
  | "hospital_beds_coverage"
  | "healthcare_access_deficiency"
  | "poverty_rate"
  | "poverty_population"
  | "total_poverty_population"
  | (string & {});

export type ComparisonVariant =
  | "green"
  | "yellow"
  | "red"
  | "neutral"
  | "default";

export type ComparisonPriorityLevel = "high" | "medium" | "low";

export type ComparisonColorToken = "red" | "yellow" | "green" | "neutral";

export type ComparisonPeriod = {
  id: number;
  periodYear: number;
};

export type ComparisonTerritory = {
  id: number;
  code: string;
  name: string;
  parentName?: string;
  type: ComparisonLevel;
};

export type ComparisonReferenceLine = {
  value: number | null;
  label: string;
};

export type ComparisonChartDataPoint = {
  territoryCode: string;
  label: string;
  subtitle?: string;
  value?: number | null;
  variant: ComparisonVariant;
  extra?: {
    sourceYear?: number | null;
    availabilityStatus?: AvailabilityStatus | string | null;
    methodologyNote?: string | null;
    dataSourceName?: string | null;
    [key: string]: unknown;
  };
};

export type ComparisonChart = {
  id: ComparisonChartId;
  title: string;
  type: "bar";
  referenceLine?: ComparisonReferenceLine | null;
  data?: ComparisonChartDataPoint[];
};

export type ComparisonPriorityFactorId =
  | "hospitals_per_100k"
  | "medical_coverage"
  | "older_adults"
  | (string & {});

export type ComparisonPriorityFactorUnit =
  | "hospitals_per_100k"
  | "doctors_per_1000"
  | "percentage"
  | (string & {});

export type ComparisonPriorityFactor = {
  id: ComparisonPriorityFactorId;
  label: string;
  value?: number | null;
  unit?: ComparisonPriorityFactorUnit | null;
  variant?: ComparisonVariant | null;
};

export type ComparisonPriorityResult = {
  territoryCode: string;
  name: string;
  parentName?: string;
  score?: number | null;
  level?: ComparisonPriorityLevel | null;
  label: string;
  colorToken?: ComparisonColorToken | null;
  factors?: ComparisonPriorityFactor[];
};

export type ComparisonSummaryResponse = {
  period: ComparisonPeriod;
  level: ComparisonLevel;
  territories: ComparisonTerritory[];
  charts: ComparisonChart[];
  priority: ComparisonPriorityResult[];
};

export type GetComparisonSummaryParams = {
  level: ComparisonLevel;
  periodId: number;
  codes: [string, string];
};
