import type { RankingColumn } from "../../../components/ui/RankingTable/RankingTable.types";
import {
  translateAdminActivityAction,
  translateAdminActivityModule,
  translateAdminActivityResult,
} from "../utils/adminActivityTranslation";
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
    action: translateAdminActivityAction(log.action),
    module: translateAdminActivityModule(log.module),
    result: translateAdminActivityResult(log.result),
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
