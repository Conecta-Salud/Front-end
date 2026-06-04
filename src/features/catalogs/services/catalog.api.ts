import api from "../../../services/api";
import type {
  MunicipalityCatalogItem,
  PeriodCatalogItem,
  StateCatalogItem,
  DepartmentCatalogItem,
} from "../types/catalog.types";

type RawStateResponse = {
  id: number;
  name?: string;
  nombre?: string;
  code?: string;
  inegiCode?: string;
  claveInegi?: string;
  clave_inegi?: string;
};

type RawMunicipalityResponse = {
  id: number;
  name?: string;
  nombre?: string;
  code?: string;
  inegiCode?: string;
  claveInegi?: string;
  clave_inegi?: string;
  stateId?: number;
  idEstado?: number;
  stateCode?: string;
  stateName?: string;
  estado?: string;
};

type RawPeriodResponse = {
  id: number;
  year?: number;
  anio?: number;
  periodYear?: number;
  status?: string;
};

type DepartmentOptionsResponse = {
  items: DepartmentCatalogItem[];
};

type FetchMunicipalitiesCatalogParams = {
  stateId?: number;
  signal?: AbortSignal;
};

const isAbortSignal = (value: unknown): value is AbortSignal => {
  return (
    typeof value === "object" &&
    value !== null &&
    "aborted" in value &&
    "addEventListener" in value
  );
};

const normalizeState = (state: RawStateResponse): StateCatalogItem => ({
  id: state.id,
  name: state.name ?? state.nombre ?? "",
  code:
    state.code ??
    state.inegiCode ??
    state.claveInegi ??
    state.clave_inegi ??
    "",
});

const normalizeMunicipality = (
  municipality: RawMunicipalityResponse
): MunicipalityCatalogItem => ({
  id: municipality.id,
  name: municipality.name ?? municipality.nombre ?? "",
  code:
    municipality.code ??
    municipality.inegiCode ??
    municipality.claveInegi ??
    municipality.clave_inegi ??
    "",
  stateId: municipality.stateId ?? municipality.idEstado ?? 0,
  stateCode: municipality.stateCode,
  stateName: municipality.stateName ?? municipality.estado,
});

const normalizePeriod = (period: RawPeriodResponse): PeriodCatalogItem => ({
  id: period.id,
  year: period.year ?? period.anio ?? period.periodYear ?? 0,
  status: period.status,
});

export async function fetchStatesCatalog(signal?: AbortSignal) {
  const response = await api.get<RawStateResponse[]>("/states", { signal });
  return response.data.map(normalizeState);
}

export async function fetchMunicipalitiesCatalog(
  paramsOrSignal?: FetchMunicipalitiesCatalogParams | AbortSignal
) {
  const params = isAbortSignal(paramsOrSignal)
    ? { signal: paramsOrSignal }
    : paramsOrSignal ?? {};

  const response = await api.get<RawMunicipalityResponse[]>("/municipalities", {
    signal: params.signal,
    params: {
      stateId: params.stateId,
    },
  });

  return response.data.map(normalizeMunicipality);
}

export async function fetchPeriodsCatalog(signal?: AbortSignal) {
  const response = await api.get<RawPeriodResponse[]>("/periods", { signal });
  return response.data.map(normalizePeriod);
}

export async function fetchDepartmentsCatalog(signal?: AbortSignal) {
  const response = await api.get<DepartmentOptionsResponse>("/departments", {
    signal,
  });

  return response.data.items;
}
