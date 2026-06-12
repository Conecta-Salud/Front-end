import type { TerritoryLevel } from "../../shared/types/apiContracts.types";

export type DashboardTerritoryLevel = TerritoryLevel;

export type DashboardScope = {
  level: DashboardTerritoryLevel;
  stateId: number | null;
  municipalityId: number | null;
  periodId: number | null;
  isReady: boolean;
  isLoading: boolean;
};

export type DashboardTerritoryDto = {
  id: number | null;
  name: string;
  type: string;
};

export type DashboardPeriodDto = {
  id: number;
  periodYear: number;
};

export type DashboardHealthDto = {
  totalHealthUnits: number;
  totalDoctors: number;
  totalNurses: number;
  totalHospitalBeds: number;
  totalConsultingRooms: number;
};

export type DashboardIndicatorsDto = {
  totalPopulation: number;
  totalPovertyPopulation: number;
  healthcareAccessDeficiency: number;
  percentageOver60: number;
};

export type DashboardHealthResponse = {
  territory: DashboardTerritoryDto;
  period: DashboardPeriodDto;
  health: DashboardHealthDto;
};

export type DashboardIndicatorsResponse = {
  territory: DashboardTerritoryDto;
  period: DashboardPeriodDto;
  indicators: DashboardIndicatorsDto;
};

export type DashboardCountryParams = {
  periodId: number;
};

export type DashboardStateParams = {
  stateId: number;
  periodId: number;
};

export type DashboardMunicipalityParams = {
  municipalityId: number;
  periodId: number;
};
