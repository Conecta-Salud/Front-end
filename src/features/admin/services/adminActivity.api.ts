import api from "../../../services/api";
import type {
  AdminActivityLogsResponse,
  AdminActivityQueryParams,
} from "../types/adminActivity.types";

export async function fetchAdminActivityLogs(
  params: AdminActivityQueryParams = {},
  signal?: AbortSignal
) {
  const response = await api.get<AdminActivityLogsResponse>(
    "/admin/activity-logs",
    {
      params,
      signal,
    }
  );

  return response.data;
}
