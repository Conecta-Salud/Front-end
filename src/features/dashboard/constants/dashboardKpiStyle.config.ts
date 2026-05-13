import type { DashboardKpiVariant } from "../types/dashboardSummary.types";

export const dashboardKpiVariantOverrides: Record<
  string,
  DashboardKpiVariant
> = {
  // Medical coverage
  doctors_per_1000: "green",
  critical_states: "red",
  total_doctors: "default",
  average_state_medical_coverage: "default",

  critical_municipalities: "red",
  average_municipal_coverage: "default",
  available_consulting_rooms: "default",
  available_hospitals: "default",

  // Hospital beds
  hospital_beds_per_1000: "green",
  states_with_hospital_deficit: "red",
  total_hospitals: "default",
  average_beds_per_hospital: "default",

  municipalities_with_hospital_deficit: "red",
  total_consulting_rooms: "default",
  total_hospital_beds: "green",
  predominant_care_level: "default",

  // Vulnerability
  total_population: "default",
  vulnerable_population: "red",
  priority_states: "red",
  medical_coverage_index: "green",

  priority_municipalities: "red",
  available_infrastructure: "default",
  available_doctors: "green",
  health_centers: "default",
  coverage_index: "green",
};