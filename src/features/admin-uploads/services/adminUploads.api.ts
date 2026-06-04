import api from "../../../services/api";
import type {
  CreateUploadBatchRequest,
  CsvFileRole,
  PaginatedResponse,
  ProcessBatchRequest,
  ProcessBatchResponse,
  UploadBatchDetail,
  UploadBatchesFilters,
  UploadBatchSummary,
  UploadErrorItem,
  UploadErrorsFilters,
  UploadFileResponse,
  ValidateUploadResponse,
} from "../types/adminUploads.types";

const UPLOAD_TIMEOUT_MS = 120_000;
const PROCESS_TIMEOUT_MS = 180_000;

type RequestOptions = {
  signal?: AbortSignal;
};

export async function createUploadBatch(
  request: CreateUploadBatchRequest,
  options?: RequestOptions
) {
  const response = await api.post<UploadBatchSummary>(
    "/api/v1/admin/uploads/batches",
    request,
    {
      signal: options?.signal,
    }
  );

  return response.data;
}

export async function uploadBatchFile(
  batchId: number,
  file: File,
  fileRole: CsvFileRole | string,
  options?: RequestOptions
) {
  const formData = new FormData();
  formData.append("fileRole", fileRole);
  formData.append("file", file);

  const response = await api.post<UploadFileResponse>(
    `/api/v1/admin/uploads/batches/${batchId}/files`,
    formData,
    {
      signal: options?.signal,
      timeout: UPLOAD_TIMEOUT_MS,
    }
  );

  return response.data.file;
}

export async function validateUpload(
  uploadId: number,
  options?: RequestOptions
) {
  const response = await api.post<ValidateUploadResponse>(
    `/api/v1/admin/uploads/${uploadId}/validate`,
    undefined,
    {
      signal: options?.signal,
      timeout: PROCESS_TIMEOUT_MS,
    }
  );

  return response.data;
}

export async function processUploadBatch(
  batchId: number,
  request: ProcessBatchRequest,
  options?: RequestOptions
) {
  const response = await api.post<ProcessBatchResponse>(
    `/api/v1/admin/uploads/batches/${batchId}/process`,
    request,
    {
      signal: options?.signal,
      timeout: PROCESS_TIMEOUT_MS,
    }
  );

  return response.data;
}

export async function fetchUploadBatches(
  filters: UploadBatchesFilters = {},
  options?: RequestOptions
) {
  const response = await api.get<PaginatedResponse<UploadBatchSummary>>(
    "/api/v1/admin/uploads/batches",
    {
      signal: options?.signal,
      params: filters,
    }
  );

  return response.data;
}

export async function fetchUploadBatchDetail(
  batchId: number,
  options?: RequestOptions
) {
  const response = await api.get<UploadBatchDetail>(
    `/api/v1/admin/uploads/batches/${batchId}`,
    {
      signal: options?.signal,
    }
  );

  return response.data;
}

export async function fetchUploadBatchErrors(
  batchId: number,
  filters: UploadErrorsFilters = {},
  options?: RequestOptions
) {
  const response = await api.get<PaginatedResponse<UploadErrorItem>>(
    `/api/v1/admin/uploads/batches/${batchId}/errors`,
    {
      signal: options?.signal,
      params: filters,
    }
  );

  return response.data;
}

export async function fetchUploadErrors(
  uploadId: number,
  filters: UploadErrorsFilters = {},
  options?: RequestOptions
) {
  const response = await api.get<PaginatedResponse<UploadErrorItem>>(
    `/api/v1/admin/uploads/${uploadId}/errors`,
    {
      signal: options?.signal,
      params: filters,
    }
  );

  return response.data;
}
