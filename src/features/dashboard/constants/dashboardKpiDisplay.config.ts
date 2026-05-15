import type {
  DashboardKpiVariant,
} from "../types/dashboardSummary.types";


export type DashboardKpiDisplayConfig = {
  title: string;
  titleSecondLine?: string;
  variant?: DashboardKpiVariant;
};

export const dashboardKpiDisplayConfig: Record<
  string,
  DashboardKpiDisplayConfig
> = {
  // Cobertura médica
  doctors_per_1000: {
    title: "Promedio médicos",
    titleSecondLine: "por 1000 habitantes",
    variant: "green",
  },
  critical_states: {
    title: "Estados",
    titleSecondLine: "críticos",
    variant: "red",
  },
  critical_municipalities: {
    title: "Municipios",
    titleSecondLine: "críticos",
    variant: "red",
  },
  total_doctors: {
    title: "Total",
    titleSecondLine: "médicos",
  },
  average_state_medical_coverage: {
    title: "Promedio por estado de",
    titleSecondLine: "cobertura médica",
    variant: "default",
  },
  average_municipal_coverage: {
    title: "Promedio",
    titleSecondLine: "municipal",
    variant: "default",
  },
  available_consulting_rooms: {
    title: "Consultorios",
    titleSecondLine: "disponibles",
  },
  available_hospitals: {
    title: "Hospitales",
    titleSecondLine: "disponibles",
    variant: "default",
  },

  // Infraestructura hospitalaria
  hospital_beds_per_1000: {
    title: "Camas hospitalarias",
    titleSecondLine: "por 1000 habitantes",
    variant: "green",
  },
  states_with_hospital_deficit: {
    title: "Estados con déficit",
    titleSecondLine: "hospitalario",
    variant: "red",
  },
  municipalities_with_hospital_deficit: {
    title: "Municipios con déficit",
    titleSecondLine: "hospitalario",
    variant: "red",
  },
  total_hospitals: {
    title: "Total",
    titleSecondLine: "hospitales",
  },
  average_beds_per_hospital: {
    title: "Promedio camas",
    titleSecondLine: "por hospital",
  },
  total_consulting_rooms: {
    title: "Consultorios",
    titleSecondLine: "totales",
    variant: "green",
  },
  total_hospital_beds: {
    title: "Camas",
    titleSecondLine: "hospitalarias",
    variant: "default",
  },
  predominant_care_level: {
    title: "Nivel de atención",
    titleSecondLine: "predominante",
    variant: "default",
  },

  // Vulnerabilidad poblacional
  total_population: {
    title: "Población",
    titleSecondLine: "total",
  },
  vulnerable_population: {
    title: "Población",
    titleSecondLine: "vulnerable",
    variant: "green",
  },
  priority_states: {
    title: "Estados",
    titleSecondLine: "prioritarios",
    variant: "default",
  },
  priority_municipalities: {
    title: "Municipios",
    titleSecondLine: "prioritarios",
    variant: "red",
  },
  medical_coverage_index: {
    title: "Índice de cobertura",
    titleSecondLine: "médica",
    variant: "default",
  },
  available_infrastructure: {
    title: "Infraestructura",
    titleSecondLine: "disponible",
  },
  available_doctors: {
    title: "Médicos",
    titleSecondLine: "disponibles",
    variant: "green",
  },
  health_centers: {
    title: "Centros",
    titleSecondLine: "de salud",
    variant: "default",
  },
  coverage_index: {
    title: "Índice",
    titleSecondLine: "de cobertura",
    variant: "default",
  },
};

