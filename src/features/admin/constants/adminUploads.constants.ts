import type { AdminUploadOption } from "../types/adminUploads.types";

export const ADMIN_UPLOAD_OPTIONS: AdminUploadOption[] = [
  {
    value: "indicators",
    label: "Datos poblacionales",
    endpoint: "/upload/Indicadores",
  },
  {
    value: "sectorials",
    label: "Salud sectorial",
    endpoint: "/upload/Sectoriales",
  },
  {
    value: "establishments",
    label: "Salud establecimientos",
    endpoint: "/upload/Establecimiento",
  },
];
