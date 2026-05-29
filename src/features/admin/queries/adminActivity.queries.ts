import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchAdminActivityLogs } from "../services/adminActivity.api";
import type { AdminActivityQueryParams } from "../types/adminActivity.types";

export const adminActivityQueryKeys = {
  all: ["admin-activity"] as const,
  list: (params: AdminActivityQueryParams) =>
    [...adminActivityQueryKeys.all, "list", params] as const,
};

export function useAdminActivityLogsQuery(params: AdminActivityQueryParams) {
  return useQuery({
    queryKey: adminActivityQueryKeys.list(params),
    queryFn: () => fetchAdminActivityLogs(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}
