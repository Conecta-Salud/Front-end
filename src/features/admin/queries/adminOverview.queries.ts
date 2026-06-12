import { useQuery } from "@tanstack/react-query";

import { getAdminOverview } from "../services/adminOverview.api";

export const adminOverviewQueryKeys = {
  all: ["admin-overview"] as const,
};

export function useAdminOverviewQuery() {
  return useQuery({
    queryKey: adminOverviewQueryKeys.all,
    queryFn: getAdminOverview,
    staleTime: 1000 * 60 * 5,
  });
}
