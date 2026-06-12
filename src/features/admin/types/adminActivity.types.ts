import type { RankingTableBaseRow } from "../../../components/ui/RankingTable/RankingTable.types";

export type AdminActivityResult = "success" | "error" | "failure";

export type AdminActivityLog = {
  id: number;
  action: string;
  createdAt: string;
  detail: string;
  module: string;
  result: string;
  userEmail: string;
  userFullName: string;
  userId: string;
};

export type AdminActivityLogsResponse = {
  items: AdminActivityLog[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};

export type AdminActivityQueryParams = {
  query?: string;
  action?: string;
  module?: string;
  result?: string;
  from?: string;
  to?: string;
  page?: number;
  size?: number;
};

export type AdminActivityTableRow = RankingTableBaseRow & {
  id: number;
  createdAt: string;
  userEmail: string;
  action: string;
  module: string;
  result: string;
  originalLog: AdminActivityLog;
};
