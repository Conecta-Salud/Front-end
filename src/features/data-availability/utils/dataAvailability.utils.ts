import type { HealthMapIndicator } from "../../health-map/types/healthMap.types";
import type {
  AvailabilityStatus,
  DataAvailabilityItem,
  TerritoryLevel,
} from "../types/dataAvailability.types";

const categoryCodeByHeaderIndicator: Record<HealthMapIndicator, string> = {
  medical_coverage: "medical_coverage",
  hospital_beds: "hospital_infrastructure",
  healthcare_access_deficiency: "population_vulnerability",
};

const availableStatuses = new Set<AvailabilityStatus>([
  "available",
  "partial",
  "estimated",
]);

const unavailableStatuses = new Set<AvailabilityStatus>([
  "not_available",
  "not_applicable",
]);

type CategoryAvailabilityParams = {
  items?: DataAvailabilityItem[];
  territoryLevel: TerritoryLevel;
  analysisYear: number;
  headerIndicator: HealthMapIndicator;
};

export function getAvailableYears(items: DataAvailabilityItem[] = []) {
  return Array.from(
    new Set(
      items
        .map((item) => item.analysisYear)
        .filter((year) => Number.isFinite(year))
    )
  ).sort((a, b) => b - a);
}

export function getCategoryCodeFromHeaderIndicator(
  indicator: HealthMapIndicator
) {
  return categoryCodeByHeaderIndicator[indicator];
}

function isAvailabilityItemAvailable(item: DataAvailabilityItem) {
  if (unavailableStatuses.has(item.availabilityStatus)) {
    return false;
  }

  return item.available === true || availableStatuses.has(item.availabilityStatus);
}

function getMatchingAvailabilityItems({
  items = [],
  territoryLevel,
  analysisYear,
  headerIndicator,
}: CategoryAvailabilityParams) {
  const categoryCode = getCategoryCodeFromHeaderIndicator(headerIndicator);

  return items.filter(
    (item) =>
      item.categoryCode === categoryCode &&
      item.territoryLevel === territoryLevel &&
      Number(item.analysisYear) === Number(analysisYear)
  );
}

export function isCategoryAvailable(params: CategoryAvailabilityParams) {
  const matchingItems = getMatchingAvailabilityItems(params);

  if (!matchingItems.length) {
    return false;
  }

  return matchingItems.some(isAvailabilityItemAvailable);
}

export function getCategoryAvailabilityNote(params: CategoryAvailabilityParams) {
  const matchingItems = getMatchingAvailabilityItems(params);
  const unavailableItem =
    matchingItems.find(
      (item) => !isAvailabilityItemAvailable(item) && Boolean(item.note)
    ) ?? matchingItems.find((item) => Boolean(item.note));

  if (unavailableItem?.note) {
    return unavailableItem.note;
  }

  return "No hay datos disponibles para la categoria, nivel territorial y ano seleccionados.";
}
