import { useMutation } from "@tanstack/react-query";

import { uploadAdminCsv } from "../services/adminUploads.api";

export function useAdminUploadCsvMutation() {
  return useMutation({
    mutationFn: uploadAdminCsv,
  });
}
