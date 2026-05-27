import type { HealthMapIndicator } from "../types/healthMap.types";

export type HealthMapLegendStatus = "good" | "risk" | "critical";

export type HealthMapLegendItem = {
  status: HealthMapLegendStatus;
  label: string;
  range: string;
  colorClassName: string;
};

export type HealthMapLegendConfig = {
  title: string;
  description: string;
  ticks: string[];
  items: HealthMapLegendItem[];
};

export const healthMapLegendConfig: Record<
  HealthMapIndicator,
  HealthMapLegendConfig
> = {
  medical_coverage: {
    title: "Tasa de médicos por cada 1000 habitantes",
    description:
      "Este indicador mide la disponibilidad de médicos en relación con la población.",
    ticks: ["4.0", "2.7", "1.0", "0"],
    items: [
      {
        status: "good",
        label: "Bueno",
        range: ">= 2.7",
        colorClassName: "text-[#12D439]",
      },
      {
        status: "risk",
        label: "Riesgo",
        range: "2.69 - 1.0",
        colorClassName: "text-[#E8E338]",
      },
      {
        status: "critical",
        label: "Crítico",
        range: "< 1.0",
        colorClassName: "text-[#FC6767]",
      },
    ],
  },

  hospital_beds: {
    title: "Camas hospitalarias por cada 1000 habitantes",
    description:
      "Este indicador mide la disponibilidad de camas hospitalarias en relación con la población.",
    ticks: ["4.0", "3.0", "1.0", "0"],
    items: [
      {
        status: "good",
        label: "Bueno",
        range: ">= 3.0",
        colorClassName: "text-[#12D439]",
      },
      {
        status: "risk",
        label: "Riesgo",
        range: "2.99 - 1.0",
        colorClassName: "text-[#E8E338]",
      },
      {
        status: "critical",
        label: "Crítico",
        range: "< 1.0",
        colorClassName: "text-[#FC6767]",
      },
    ],
  },

  healthcare_access_deficiency: {
    title: "Carencia de acceso a servicios de salud",
    description:
      "Este indicador mide el porcentaje de población sin acceso a servicios de salud.",
    ticks: ["0%", "20%", "40%", "100%"],
    items: [
      {
        status: "good",
        label: "Bueno",
        range: "<= 20%",
        colorClassName: "text-[#12D439]",
      },
      {
        status: "risk",
        label: "Riesgo",
        range: "20% - 39.99%",
        colorClassName: "text-[#E8E338]",
      },
      {
        status: "critical",
        label: "Crítico",
        range: ">= 40%",
        colorClassName: "text-[#FC6767]",
      },
    ],
  },
};