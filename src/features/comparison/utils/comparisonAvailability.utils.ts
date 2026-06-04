import type {
  DataAvailabilityItem,
  TerritoryLevel,
} from "../../data-availability/types/dataAvailability.types";

export const COMPARISON_SECTORIAL_CATEGORY_CODE = "medical_coverage";

export const COMPARISON_SECTORIAL_UNAVAILABLE_MESSAGE =
  "No hay datos sectoriales disponibles para el año seleccionado. Selecciona un año con datos de salud sectorial, como 2018, 2020, 2022 o 2024.";

const AVAILABLE_COMPARISON_STATUSES = new Set([
  "available",
  "partial",
  "estimated",
]);

export type ComparisonAvailabilityState = {
  hasAvailabilityRecord: boolean;
  isAvailable: boolean;
};

export function getComparisonTerritoryLevel(
  level: "state" | "municipality"
): TerritoryLevel {
  return level === "municipality" ? "municipality" : "state";
}

export function getComparisonAvailabilityState(
  items: DataAvailabilityItem[] = []
): ComparisonAvailabilityState {
  if (!items.length) {
    return {
      hasAvailabilityRecord: false,
      isAvailable: false,
    };
  }

  const isAvailable = items.some((item) => {
    if (item.available === true) {
      return true;
    }

    return AVAILABLE_COMPARISON_STATUSES.has(item.availabilityStatus);
  });

  return {
    hasAvailabilityRecord: true,
    isAvailable,
  };
}