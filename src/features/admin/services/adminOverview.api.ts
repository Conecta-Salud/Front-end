import api from "../../../services/api";
import type { AdminOverview } from "../types/adminOverview.types";

export const getAdminOverview = async (): Promise<AdminOverview> => {
  const { data } = await api.get<AdminOverview>("/admin/overview");

  return data;
};
