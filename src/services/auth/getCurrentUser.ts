import api from "../api";

export type UserRole = "strategic" | "admin";

export type AuthUser = {
  id: number;
  departmentId: number;
  departmentName: string;
  firstName: string;
  lastName: string;
  email: string;
  firebaseUid: string;
  role: UserRole;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>("/users/profile");
  return response.data;
};

