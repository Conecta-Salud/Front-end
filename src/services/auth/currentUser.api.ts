import api from "../api";

export type UserRole = "strategic" | "admin";

export type AuthUser = {
  id: string;
  departmentId: number;
  departmentName: string;
  firstName: string;
  lastName: string;
  email: string;
  firebaseUuid: string;
  role: UserRole;
  lastLoginAt: string;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>("/users/profile");
  return response.data;
};
