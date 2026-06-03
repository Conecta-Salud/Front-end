export type TerritoryLevel = "country" | "state" | "municipality";

export type AvailabilityStatus =
  | "available"
  | "partial"
  | "not_available"
  | "not_applicable"
  | "estimated";

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
