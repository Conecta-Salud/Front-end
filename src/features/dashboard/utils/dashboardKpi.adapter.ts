import type {
  DashboardHealthResponse,
  DashboardIndicatorsResponse,
} from "../types/dashboard.types";

export type DashboardKpiItem = {
  id: string;
  title: string;
  titleSecondLine?: string;
  subtitle?: string;
  value: string | number;
  variant?: "default" | "green" | "red";
};

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("es-MX").format(value);
};

const formatPercentage = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "—";

  return `${value.toFixed(2)}%`;
};

export function buildDashboardKpis(params: {
  healthResponse?: DashboardHealthResponse;
  indicatorsResponse?: DashboardIndicatorsResponse;
}): DashboardKpiItem[] {
  const health = params.healthResponse?.health;
  const indicators = params.indicatorsResponse?.indicators;

  return [
    {
      id: "total-doctors",
      title: "Total doctors",
      subtitle: "Registered medical staff",
      value: formatNumber(health?.totalDoctors),
      variant: "green",
    },
    {
      id: "health-units",
      title: "Health units",
      subtitle: "Available units",
      value: formatNumber(health?.totalHealthUnits),
      variant: "default",
    },
    {
      id: "hospital-beds",
      title: "Hospital beds",
      subtitle: "Available infrastructure",
      value: formatNumber(health?.totalHospitalBeds),
      variant: "default",
    },
    {
      id: "total-population",
      title: "Total",
      titleSecondLine: "population",
      subtitle: "Registered population",
      value: formatNumber(indicators?.totalPopulation),
      variant: "default",
    },
    {
      id: "healthcare-access-deficiency",
      title: "Healthcare access",
      titleSecondLine: "deficiency",
      subtitle: "Population without access",
      value: formatNumber(indicators?.healthcareAccessDeficiency),
      variant: "red",
    },
    {
      id: "older-population",
      title: "Population",
      titleSecondLine: "over 60",
      subtitle: "Demographic vulnerability",
      value: formatPercentage(indicators?.percentageOver60),
      variant: "default",
    },
  ];
}