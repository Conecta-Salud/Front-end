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
  stateName?: string;
};

export type PeriodCatalogItem = {
  id: number;
  year: number;
  status?: string;
};

export type DepartmentCatalogItem = {
  id: number;
  name: string;
};
