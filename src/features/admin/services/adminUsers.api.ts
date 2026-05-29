import api from "../../../services/api";
import type {
  AdminUser,
  AdminUsersResponse,
  UpdateAdminUserPayload,
  AdminUsersQueryParams,
  ChangeAdminUserPasswordPayload,
} from "../types/adminUsers.types";

export async function fetchAdminUsers(
  params: AdminUsersQueryParams = {},
  signal?: AbortSignal
) {
  const response = await api.get<AdminUsersResponse>("/users", {
    params,
    signal,
  });

  return response.data;
}
export async function updateAdminUser({
  userId,
  payload,
}: {
  userId: string;
  payload: UpdateAdminUserPayload;
}) {
  const response = await api.put<AdminUser>(`/users/${userId}`, payload);
  return response.data;
}

export async function deactivateAdminUser(userId: string) {
  const response = await api.delete<AdminUser>(`/users/${userId}`);
  return response.data;
}

export async function reactivateAdminUser(userId: string) {
  const response = await api.put<AdminUser>(`/users/reactivate/${userId}`);
  return response.data;
}

export async function changeAdminUserPassword({
  userId,
  payload,
}: {
  userId: string;
  payload: ChangeAdminUserPasswordPayload;
}) {
  await api.patch(`/users/${userId}/password`, payload);
}
