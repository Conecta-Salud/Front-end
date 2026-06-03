import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { fetchAdminActivityLogs } from "../services/adminActivity.api";
import { ADMIN_PAGE_SIZE } from "../constants/adminDisplay.constants";
import type { AdminActivityQueryParams } from "../types/adminActivity.types";
import { getNextAdminPageParam } from "../utils/adminPagination.utils";

export const adminActivityQueryKeys = {
  all: ["admin-activity"] as const,
  list: (params: AdminActivityQueryParams) =>
    [...adminActivityQueryKeys.all, "list", params] as const,
};

export function useAdminActivityLogsQuery(params: AdminActivityQueryParams) {
  return useQuery({
    queryKey: adminActivityQueryKeys.list(params),
    queryFn: ({ signal }) => fetchAdminActivityLogs(params, signal),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useAdminActivityLogsInfiniteQuery(
  params: AdminActivityQueryParams
) {
  const pageSize = params.size ?? ADMIN_PAGE_SIZE;

  return useInfiniteQuery({
    queryKey: adminActivityQueryKeys.list(params),
    queryFn: ({ pageParam, signal }) =>
      fetchAdminActivityLogs(
        {
          ...params,
          page: pageParam,
          size: pageSize,
        },
        signal
      ),
    initialPageParam: params.page ?? 0,
    getNextPageParam: (lastPage, allPages) =>
      getNextAdminPageParam(lastPage, allPages, pageSize),
    staleTime: 1000 * 60 * 5,
  });
}
