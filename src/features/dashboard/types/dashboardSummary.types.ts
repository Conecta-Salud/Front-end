import type { HealthMapIndicator } from "../../health-map/types/healthMap.types";
import type { DashboardTerritoryLevel } from "./dashboard.types";

export type DashboardCategory = HealthMapIndicator;

export type DashboardKpiVariant =
  | "green"
  | "red"
  | "default"

export type DashboardStatusLevel =
  | "good"
  | "risk"
  | "critical"
  | "no_data";

export type DashboardColorToken =
  | "green"
  | "red"

export type DashboardChartType = "bar" | "pie" | "scatter";

export type DashboardTerritorySummary = {
  id?: number | null;
  code?: string | null;
  name: string;
  type: DashboardTerritoryLevel;
};

export type DashboardPeriodSummary = {
  id: number;
  periodYear: number;
};

export type DashboardKpi = {
  id: string;
  label: string;
  value?: number | null;
  unit: string;
  variant: DashboardKpiVariant;
  order: number;
};

export type DashboardRankingColumn = {
  key: string;
  label: string;
};

export type DashboardRankingRow = {
  id: string;
  rank?: number;
  code?: string;
  name: string;

  population?: number;
  doctors?: number;
  hospitalBeds?: number;
  consultingRooms?: number;
  value?: number | null;

  level?: DashboardStatusLevel;
  colorToken?: DashboardColorToken;

  extra?: Record<string, unknown>;
};

export type DashboardRanking = {
  title: string;
  columns: DashboardRankingColumn[];
  rows: DashboardRankingRow[];
};

export type DashboardReferenceLine = {
  value: number;
  label: string;
};

export type DashboardChartDataPoint = {
  label: string;
  code?: string;

  value?: number | null;
  population?: number;
  doctors?: number;
  hospitalBeds?: number;
  consultingRooms?: number;
  coverageIndex?: number;

  level?: DashboardStatusLevel;
  colorToken?: DashboardColorToken;

  extra?: Record<string, unknown>;
};

export type DashboardChart = {
  type: DashboardChartType;
  title: string;
  xKey?: string | null;
  yKey?: string | null;
  referenceLine?: DashboardReferenceLine | null;
  data: DashboardChartDataPoint[];
};

export type DashboardSummaryResponse = {
  territory: DashboardTerritorySummary;
  period: DashboardPeriodSummary;
  category: DashboardCategory;
  kpis: DashboardKpi[];
  ranking: DashboardRanking;
  mainChart: DashboardChart;
  secondaryChart: DashboardChart;
};

export type DashboardSummaryRequest = {
  level: DashboardTerritoryLevel;
  stateId?: number | null;
  municipalityId?: number | null;
  periodId: number;
  category: DashboardCategory;
};