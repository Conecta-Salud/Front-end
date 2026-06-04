import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUploadBatch,
  processUploadBatch,
  uploadBatchFile,
  validateUpload,
} from "../services/adminUploads.api";
import { adminUploadsQueryKeys } from "../queries/adminUploads.queries";
import type {
  CreateUploadBatchRequest,
  CsvFileRole,
  ProcessBatchRequest,
} from "../types/adminUploads.types";

export function useCreateUploadBatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateUploadBatchRequest) =>
      createUploadBatch(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminUploadsQueryKeys.all,
      });
    },
  });
}

export function useUploadBatchFileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      batchId,
      file,
      fileRole,
    }: {
      batchId: number;
      file: File;
      fileRole: CsvFileRole | string;
    }) => uploadBatchFile(batchId, file, fileRole),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminUploadsQueryKeys.batchDetail(variables.batchId),
      });
      queryClient.invalidateQueries({
        queryKey: adminUploadsQueryKeys.all,
      });
    },
  });
}

export function useValidateUploadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uploadId: number) => validateUpload(uploadId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminUploadsQueryKeys.all,
      });
    },
  });
}

export function useProcessUploadBatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      batchId,
      request,
    }: {
      batchId: number;
      request: ProcessBatchRequest;
    }) => processUploadBatch(batchId, request),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminUploadsQueryKeys.batchDetail(variables.batchId),
      });
      queryClient.invalidateQueries({
        queryKey: adminUploadsQueryKeys.all,
      });
    },
  });
}
