import api from "../../../services/api";
import type {
  DashboardCountryParams,
  DashboardHealthResponse,
  DashboardIndicatorsResponse,
  DashboardMunicipalityParams,
  DashboardStateParams,
} from "../types/dashboard.types";

export async function fetchCountryDashboardIndicators({
  periodId,
}: DashboardCountryParams) {
  const response = await api.get<DashboardIndicatorsResponse>(
    "/dashboard/country/indicators",
    {
      params: {
        periodId,
      },
    }
  );

  return response.data;
}

export async function fetchCountryDashboardHealth({
  periodId,
}: DashboardCountryParams) {
  const response = await api.get<DashboardHealthResponse>(
    "/dashboard/country/health",
    {
      params: {
        periodId,
      },
    }
  );

  return response.data;
}

export async function fetchStateDashboardIndicators({
  stateId,
  periodId,
}: DashboardStateParams) {
  const response = await api.get<DashboardIndicatorsResponse>(
    `/dashboard/states/${stateId}/indicators`,
    {
      params: {
        periodId,
      },
    }
  );

  return response.data;
}

export async function fetchMunicipalityDashboardIndicators({
  municipalityId,
  periodId,
}: DashboardMunicipalityParams) {
  const response = await api.get<DashboardIndicatorsResponse>(
    `/dashboard/municipalities/${municipalityId}/indicators`,
    {
      params: {
        periodId,
      },
    }
  );

  return response.data;
}

export async function fetchStateDashboardHealth({
  stateId,
  periodId,
}: DashboardStateParams) {
  const response = await api.get<DashboardHealthResponse>(
    `/dashboard/states/${stateId}/health`,
    {
      params: {
        periodId,
      },
    }
  );

  return response.data;
}

export async function fetchMunicipalityDashboardHealth({
  municipalityId,
  periodId,
}: DashboardMunicipalityParams) {
  const response = await api.get<DashboardHealthResponse>(
    `/dashboard/municipalities/${municipalityId}/health`,
    {
      params: {
        periodId,
      },
    }
  );

  return response.data;
}