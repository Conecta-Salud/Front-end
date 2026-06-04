import api from "../../../services/api";
import { ADMIN_UPLOAD_OPTIONS } from "../constants/adminUploads.constants";
import type { AdminUploadPayload } from "../types/adminUploads.types";

export async function uploadAdminCsv({ dataset, file }: AdminUploadPayload) {
  const uploadOption = ADMIN_UPLOAD_OPTIONS.find(
    (option) => option.value === dataset
  );

  if (!uploadOption) {
    throw new Error("Tipo de carga no válido.");
  }

  const formData = new FormData();
  formData.append("fileContent", file);

  await api.post(uploadOption.endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 300000,
  });
}
