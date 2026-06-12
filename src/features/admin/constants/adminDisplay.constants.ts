import type { AdminUserRole } from "../types/adminUsers.types";

export const ADMIN_PAGE_SIZE = 50;

export const ADMIN_ROLE_LABELS: Record<AdminUserRole, string> = {
  admin: "Administrador",
  strategic: "Estratégico",
};

export const ADMIN_ROLE_OPTIONS: Array<{ name: string; value: AdminUserRole }> =
  [
    { name: ADMIN_ROLE_LABELS.admin, value: "admin" },
    { name: ADMIN_ROLE_LABELS.strategic, value: "strategic" },
  ];

export const ADMIN_ACTIVE_OPTIONS = [
  { name: "Activo", value: "active" },
  { name: "Inactivo", value: "inactive" },
];

export const ADMIN_ACTIVITY_ACTION_LABELS: Record<string, string> = {
  LOGIN: "Inicio de sesión",
  COMPARE_STATES: "Comparación de estados",
  COMPARE_MUNICIPALITIES: "Comparación de municipios",
  CREATE_USER: "Crear usuario",
  UPDATE_USER: "Actualizar usuario",
  DEACTIVATE_USER: "Desactivar usuario",
  REACTIVATE_USER: "Reactivar usuario",
  CHANGE_USER_PASSWORD: "Cambiar contraseña",
  UPLOAD_BATCH_CREATED: "Crear lote de carga",
  UPLOAD_FILE_UPLOADED: "Subir archivo de carga",
  UPLOAD_FILE_VALIDATED: "Validar archivo de carga",
  UPLOAD_BATCH_PROCESSED: "Procesar lote de carga",
  UPLOAD_BATCH_COMPLETED: "Completar lote de carga",
  UPLOAD_BATCH_FAILED: "Error en carga de datos",
};

export const ADMIN_ACTIVITY_MODULE_LABELS: Record<string, string> = {
  auth: "Autenticación",
  comparison: "Comparación",
  users: "Administración",
  data_uploads: "Cargas de datos",
};

export const ADMIN_ACTIVITY_RESULT_LABELS: Record<string, string> = {
  success: "Exitoso",
  warning: "Advertencia",
  error: "Error",
  failure: "Fallido",
};

const toFilterOptions = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, name]) => ({ name, value }));

export const ADMIN_ACTIVITY_ACTION_OPTIONS = toFilterOptions(
  ADMIN_ACTIVITY_ACTION_LABELS
);

export const ADMIN_ACTIVITY_MODULE_OPTIONS = toFilterOptions(
  ADMIN_ACTIVITY_MODULE_LABELS
);

export const ADMIN_ACTIVITY_RESULT_OPTIONS = toFilterOptions(
  ADMIN_ACTIVITY_RESULT_LABELS
);
