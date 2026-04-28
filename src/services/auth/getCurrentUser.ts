import api from "../api";

export type UserRole = "estrategico" | "administrador";

export type AuthUser = {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  firebaseUid: string;
  rol: UserRole;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>("/user/profile");
  return response.data;
};

