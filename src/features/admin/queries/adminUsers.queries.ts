import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { AdminUsersQueryParams } from "../types/adminUsers.types";

import {
  deactivateAdminUser,
  fetchAdminUsers,
  reactivateAdminUser,
  updateAdminUser,
  changeAdminUserPassword,
  createAdminUser,
  fetchAdminUserDetail,
} from "../services/adminUsers.api";
import { ADMIN_PAGE_SIZE } from "../constants/adminDisplay.constants";
import { getNextAdminPageParam } from "../utils/adminPagination.utils";

export const adminUsersQueryKeys = {
  all: ["admin-users"] as const,
  list: (params: AdminUsersQueryParams) =>
    [...adminUsersQueryKeys.all, "list", params] as const,
  detail: (userId: string | null) =>
    [...adminUsersQueryKeys.all, "detail", userId] as const,
};

export function useAdminUsersQuery(params: AdminUsersQueryParams) {
  return useQuery({
    queryKey: adminUsersQueryKeys.list(params),
    queryFn: ({ signal }) => fetchAdminUsers(params, signal),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useAdminUsersInfiniteQuery(params: AdminUsersQueryParams) {
  const pageSize = params.size ?? ADMIN_PAGE_SIZE;

  return useInfiniteQuery({
    queryKey: adminUsersQueryKeys.list(params),
    queryFn: ({ pageParam, signal }) =>
      fetchAdminUsers(
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

export function useUpdateAdminUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminUsersQueryKeys.all,
      });
    },
  });
}

export function useDeactivateAdminUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminUsersQueryKeys.all,
      });
    },
  });
}

export function useReactivateAdminUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reactivateAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminUsersQueryKeys.all,
      });
    },
  });
}

export function useChangeAdminUserPasswordMutation() {
  return useMutation({
    mutationFn: changeAdminUserPassword,
  });
}

export function useAdminUserDetailQuery(userId: string | null) {
  return useQuery({
    queryKey: adminUsersQueryKeys.detail(userId),
    queryFn: ({ signal }) => fetchAdminUserDetail(userId as string, signal),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateAdminUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminUsersQueryKeys.all,
      });
    },
  });
}
