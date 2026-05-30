import type { RankingColumn } from "../../../components/ui/RankingTable/RankingTable.types";
import {
  ADMIN_ACTIVITY_ACTION_LABELS,
  ADMIN_ACTIVITY_MODULE_LABELS,
  ADMIN_ACTIVITY_RESULT_LABELS,
} from "../constants/adminDisplay.constants";
import type {
  AdminActivityLog,
  AdminActivityTableRow,
} from "../types/adminActivity.types";

function formatDateTime(value: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function adaptAdminActivityToRows(
  logs: AdminActivityLog[]
): AdminActivityTableRow[] {
  return logs.map((log) => ({
    id: log.id,
    createdAt: formatDateTime(log.createdAt),
    userEmail: log.userEmail,
    action: ADMIN_ACTIVITY_ACTION_LABELS[log.action] ?? log.action,
    module: ADMIN_ACTIVITY_MODULE_LABELS[log.module] ?? log.module,
    result: ADMIN_ACTIVITY_RESULT_LABELS[log.result] ?? log.result,
    originalLog: log,
  }));
}

export function getAdminActivityColumns(): RankingColumn<AdminActivityTableRow>[] {
  return [
    {
      header: "Fecha y hora",
      key: "createdAt",
      width: "20%",
    },
    {
      header: "Correo Institucional",
      key: "userEmail",
      truncate: true,
      maxWidth: "max-w-[260px]",
      width: "30%",
    },
    {
      header: "Acción",
      key: "action",
      truncate: true,
      maxWidth: "max-w-[220px]",
      width: "22%",
    },
    {
      header: "Módulo",
      key: "module",
      align: "center",
      width: "14%",
    },
    {
      header: "Estado",
      key: "result",
      align: "center",
      width: "14%",
    },
  ];
}
