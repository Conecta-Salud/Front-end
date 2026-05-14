import api from "../../../services/api";
import type {
  MunicipalityCatalogItem,
  PeriodCatalogItem,
  StateCatalogItem,
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
};

type RawPeriodResponse = {
  id: number;
  year?: number;
  anio?: number;
  periodYear?: number;
  status?: string;
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
});

const normalizePeriod = (period: RawPeriodResponse): PeriodCatalogItem => ({
  id: period.id,
  year: period.year ?? period.anio ?? period.periodYear ?? 0,
});

export async function fetchStatesCatalog() {
  const response = await api.get<RawStateResponse[]>("/states");
  return response.data.map(normalizeState);
}

export async function fetchMunicipalitiesCatalog() {
  const response = await api.get<RawMunicipalityResponse[]>("/municipalities");
  return response.data.map(normalizeMunicipality);
}

export async function fetchPeriodsCatalog() {
  const response = await api.get<RawPeriodResponse[]>("/periods");
  return response.data.map(normalizePeriod);
}