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

type ValidateUploadMutationParams =
  | number
  | {
      uploadId: number;
      batchId?: number;
    };

const getValidateUploadParams = (params: ValidateUploadMutationParams) => {
  if (typeof params === "number") {
    return {
      uploadId: params,
      batchId: undefined,
    };
  }

  return params;
};

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
    mutationFn: (params: ValidateUploadMutationParams) =>
      validateUpload(getValidateUploadParams(params).uploadId),
    onSuccess: (_data, variables) => {
      const { batchId, uploadId } = getValidateUploadParams(variables);

      if (batchId) {
        queryClient.invalidateQueries({
          queryKey: adminUploadsQueryKeys.batchDetail(batchId),
        });
        queryClient.invalidateQueries({
          queryKey: adminUploadsQueryKeys.batchErrors(batchId),
        });
      }

      queryClient.invalidateQueries({
        queryKey: adminUploadsQueryKeys.uploadErrors(uploadId),
      });
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
        queryKey: adminUploadsQueryKeys.batchErrors(variables.batchId),
      });
      queryClient.invalidateQueries({
        queryKey: adminUploadsQueryKeys.all,
      });
    },
  });
}
