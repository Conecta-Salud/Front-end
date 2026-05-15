import api from "../../../services/api";
import type {
  DashboardSummaryRequest,
  DashboardSummaryResponse,
} from "../types/dashboardSummary.types";

const getDashboardSummaryPath = ({
  level,
  stateId,
  municipalityId,
}: Pick<
  DashboardSummaryRequest,
  "level" | "stateId" | "municipalityId"
>) => {
  if (level === "country") {
    return "/dashboard/country/summary";
  }

  if (level === "state") {
    if (!stateId) {
      throw new Error("stateId is required for state dashboard summary.");
    }

    return `/dashboard/states/${stateId}/summary`;
  }

  if (!municipalityId) {
    throw new Error(
      "municipalityId is required for municipality dashboard summary."
    );
  }

  return `/dashboard/municipalities/${municipalityId}/summary`;
};

export async function fetchDashboardSummary({
  level,
  stateId,
  municipalityId,
  periodId,
  category,
}: DashboardSummaryRequest) {
  const path = getDashboardSummaryPath({
    level,
    stateId,
    municipalityId,
  });

  const response = await api.get<DashboardSummaryResponse>(path, {
    params: {
      periodId,
      category,
    },
  });

  return response.data;
}