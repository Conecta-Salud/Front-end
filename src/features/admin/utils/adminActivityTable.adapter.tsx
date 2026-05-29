import type { RankingColumn } from "../../../components/ui/RankingTable/RankingTable.types";
import type {
  AdminActivityLog,
  AdminActivityTableRow,
} from "../types/adminActivity.types";

const actionLabels: Record<string, string> = {
  LOGIN: "Inicio de sesión",
  COMPARE_STATES: "Comparación de estados",
  COMPARE_MUNICIPALITIES: "Comparación de municipios",
};

const moduleLabels: Record<string, string> = {
  auth: "Autenticación",
  comparison: "Comparación",
  dashboard: "Dashboard",
  admin: "Administración",
};

const resultLabels: Record<string, string> = {
  success: "Exitoso",
  error: "Error",
  failure: "Fallido",
};

function formatDateTime(value: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function adaptAdminActivityToRows(
  logs: AdminActivityLog[]
): AdminActivityTableRow[] {
  return logs.map((log) => ({
    id: log.id,
    createdAt: formatDateTime(log.createdAt),
    userEmail: log.userEmail,
    action: actionLabels[log.action] ?? log.action,
    module: moduleLabels[log.module] ?? log.module,
    result: resultLabels[log.result] ?? log.result,
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
