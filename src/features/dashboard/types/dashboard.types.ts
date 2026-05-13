export type DashboardTerritoryLevel = "state" | "municipality";

export type DashboardScope = {
  level: DashboardTerritoryLevel;
  territoryId: number | null;
  periodId: number | null;
};

export type DashboardHealthResponse = {
  totalHealthUnits: number;
  totalDoctors: number;
  totalNurses: number;
  totalHospitalBeds: number;
  totalConsultingRooms: number;
};

export type DashboardIndicatorsResponse = {
  totalPopulation: number;
  totalPovertyPopulation: number;
  healthcareAccessDeficiency: number;
  percentageOver60: number;
};

export type DashboardStateParams = {
  stateId: number;
  periodId: number;
};

export type DashboardMunicipalityParams = {
  municipalityId: number;
  periodId: number;
};