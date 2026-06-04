import type {
  AvailabilityStatus,
  TerritoryLevel,
} from "../../shared/types/apiContracts.types";

export type {
  AvailabilityStatus,
  TerritoryLevel,
} from "../../shared/types/apiContracts.types";

export type DataAvailabilityItem = {
  categoryCode: string;
  categoryName: string;
  indicatorCode: string;
  indicatorName: string;
  territoryLevel: TerritoryLevel;
  analysisYear: number;
  sourceYear?: number | null;
  available: boolean;
  availabilityStatus: AvailabilityStatus;
  note?: string | null;
};

export type DataAvailabilityResponse = {
  years: number[];
  items: DataAvailabilityItem[];
};

export type DataAvailabilityFilters = {
  territoryLevel?: TerritoryLevel;
  analysisYear?: number;
  categoryCode?: string;
};
