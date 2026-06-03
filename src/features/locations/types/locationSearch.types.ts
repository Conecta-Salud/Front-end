export type LocationSearchType = "state" | "municipality";

export type LocationSearchResult = {
  id: number;
  code: string;
  name: string;
  type: LocationSearchType;
  stateId: number | null;
  stateCode: string | null;
  stateName: string | null;
  displayName: string;
};