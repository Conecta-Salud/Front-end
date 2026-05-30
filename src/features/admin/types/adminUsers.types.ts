export type AdminUserRole = "admin" | "strategic";

export type AdminUser = {
  id: string;
  departmentId: number;
  departmentName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: AdminUserRole;
  active: boolean;
};

export type AdminUsersResponse = {
  items: AdminUser[];
};

export type UpdateAdminUserPayload = Partial<{
  departmentId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: AdminUserRole;
  active: boolean;
}>;

export type AdminUserTableRow = {
  id: string;
  fullName: string;
  email: string;
  departmentName: string;
  role: AdminUserRole;
  active: boolean;
  originalUser: AdminUser;
};

export type AdminUsersQueryParams = {
  search?: string;
  departmentId?: number;
  role?: AdminUserRole;
  active?: boolean;
  page?: number;
  size?: number;
};

export type CreateAdminUserPayload = {
  departmentId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: AdminUserRole;
};

export type ChangeAdminUserPasswordPayload = {
  newPassword: string;
  revokeSessions?: boolean;
};

export type AdminUserStatusAction = "deactivate" | "reactivate";

export type AdminUserDetail = {
  id: string;
  departmentId: number;
  departmentName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: AdminUserRole;
  active: boolean;
};
