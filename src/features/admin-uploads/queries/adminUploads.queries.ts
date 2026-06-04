import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchUploadBatchDetail,
  fetchUploadBatchErrors,
  fetchUploadBatches,
  fetchUploadErrors,
} from "../services/adminUploads.api";
import type {
  UploadBatchesFilters,
  UploadErrorsFilters,
} from "../types/adminUploads.types";

export const adminUploadsQueryKeys = {
  all: ["admin-uploads"] as const,

  batches: (filters: UploadBatchesFilters = {}) =>
    [
      ...adminUploadsQueryKeys.all,
      "batches",
      filters.page ?? 0,
      filters.size ?? 20,
      filters.sourceType ?? "all-source-types",
      filters.status ?? "all-statuses",
      filters.dataSourceCode ?? "all-data-sources",
      filters.sourceYear ?? "all-source-years",
      filters.analysisYear ?? "all-analysis-years",
    ] as const,

  batchDetail: (batchId: number | null | undefined) =>
    [
      ...adminUploadsQueryKeys.all,
      "batch-detail",
      batchId ?? "no-batch",
    ] as const,

  batchErrors: (
    batchId: number | null | undefined,
    filters: UploadErrorsFilters = {}
  ) =>
    [
      ...adminUploadsQueryKeys.all,
      "batch-errors",
      batchId ?? "no-batch",
      filters.page ?? 0,
      filters.size ?? 20,
    ] as const,

  uploadErrors: (
    uploadId: number | null | undefined,
    filters: UploadErrorsFilters = {}
  ) =>
    [
      ...adminUploadsQueryKeys.all,
      "upload-errors",
      uploadId ?? "no-upload",
      filters.page ?? 0,
      filters.size ?? 20,
    ] as const,
};

type AdminUploadsQueryOptions = {
  enabled?: boolean;
};

export function useUploadBatchesQuery(
  filters: UploadBatchesFilters = {},
  options?: AdminUploadsQueryOptions
) {
  return useQuery({
    queryKey: adminUploadsQueryKeys.batches(filters),
    queryFn: ({ signal }) => fetchUploadBatches(filters, { signal }),
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });
}

export function useUploadBatchDetailQuery(
  batchId: number | null | undefined,
  options?: AdminUploadsQueryOptions
) {
  return useQuery({
    queryKey: adminUploadsQueryKeys.batchDetail(batchId),
    queryFn: ({ signal }) =>
      fetchUploadBatchDetail(batchId as number, { signal }),
    enabled: Boolean(batchId) && (options?.enabled ?? true),
    staleTime: 1000 * 30,
  });
}

export function useUploadBatchErrorsQuery(
  batchId: number | null | undefined,
  filters: UploadErrorsFilters = {},
  options?: AdminUploadsQueryOptions
) {
  return useQuery({
    queryKey: adminUploadsQueryKeys.batchErrors(batchId, filters),
    queryFn: ({ signal }) =>
      fetchUploadBatchErrors(batchId as number, filters, { signal }),
    enabled: Boolean(batchId) && (options?.enabled ?? true),
    staleTime: 1000 * 30,
    placeholderData: keepPreviousData,
  });
}

export function useUploadErrorsQuery(
  uploadId: number | null | undefined,
  filters: UploadErrorsFilters = {},
  options?: AdminUploadsQueryOptions
) {
  return useQuery({
    queryKey: adminUploadsQueryKeys.uploadErrors(uploadId, filters),
    queryFn: ({ signal }) =>
      fetchUploadErrors(uploadId as number, filters, { signal }),
    enabled: Boolean(uploadId) && (options?.enabled ?? true),
    staleTime: 1000 * 30,
    placeholderData: keepPreviousData,
  });
}
