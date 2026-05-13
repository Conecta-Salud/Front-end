export type StateCatalogItem = {
  id: number;
  name: string;
  code: string;
};

export type MunicipalityCatalogItem = {
  id: number;
  name: string;
  code: string;
  stateId: number;
  stateCode?: string;
};

export type PeriodCatalogItem = {
  id: number;
  year: number;
};