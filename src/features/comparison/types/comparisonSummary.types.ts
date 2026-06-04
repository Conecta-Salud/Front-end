export type ComparisonLevel = "state" | "municipality";

export type ComparisonChartId =
  | "medical_coverage"
  | "doctor_deficit"
  | "hospital_beds_per_1000"
  | "poverty_rate";

export type ComparisonVariant =
  | "green"
  | "yellow"
  | "red"
  | "neutral"
  | "default";

export type ComparisonPriorityLevel = "high" | "medium" | "low";

export type ComparisonColorToken = "red" | "yellow" | "green";

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
  extra?: Record<string, unknown>;
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
  | "older_adults";

export type ComparisonPriorityFactorUnit =
  | "hospitals_per_100k"
  | "doctors_per_1000"
  | "percentage";

export type ComparisonPriorityFactor = {
  id: ComparisonPriorityFactorId;
  label: string;
  value: number;
  unit: ComparisonPriorityFactorUnit;
  variant: ComparisonVariant;
};

export type ComparisonPriorityResult = {
  territoryCode: string;
  name: string;
  parentName?: string;
  score: number;
  level: ComparisonPriorityLevel;
  label: string;
  colorToken: ComparisonColorToken;
  factors: ComparisonPriorityFactor[];
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
