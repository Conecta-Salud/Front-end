import type {
  ProcessingMode,
  UploadSourceType,
  UploadStatus,
} from "../../shared/types/apiContracts.types";

export type {
  CsvFileRole,
  ProcessingMode,
  UploadSourceType,
  UploadStatus,
} from "../../shared/types/apiContracts.types";

export type CreateUploadBatchRequest = {
  sourceType: UploadSourceType;
  dataSourceCode: string;
  sourceYear: number;
  analysisYear?: number | null;
  expectedFiles: number;
  batchVersion: string;
  processingMode: ProcessingMode;
};

export type UploadBatchSummary = {
  id: number;
  sourceType: UploadSourceType;
  dataSourceCode: string;
  dataSourceName?: string;
  sourceYear: number;
  analysisYear?: number | null;
  expectedFiles: number;
  uploadedFiles: number;
  batchVersion: string;
  processingMode: ProcessingMode;
  status: UploadStatus;
  totalRecords: number;
  validRecords: number;
  errorRecords: number;
  createdAt?: string;
  processedAt?: string | null;
};

export type DataUploadFile = {
  id: number;
  fileRole: string;
  originalFileName: string;
  storedFileName?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
  checksum?: string | null;
  status: UploadStatus;
  totalRecords: number;
  validRecords: number;
  errorRecords: number;
  createdAt?: string;
  processedAt?: string | null;
};

export type UploadFileResponse = {
  file: DataUploadFile;
};

export type UploadBatchDetail = {
  batch: UploadBatchSummary;
  files: DataUploadFile[];
};

export type ValidateUploadResponse = {
  uploadId: number;
  status: UploadStatus;
  totalRecords: number;
  validRecords: number;
  errorRecords: number;
};

export type ProcessBatchRequest = {
  mode: ProcessingMode;
  replaceExistingForYear: boolean;
  failOnErrors: boolean;
};

export type ProcessBatchResponse = {
  batchId: number;
  sourceType: UploadSourceType;
  mode: string;
  replaceExistingForYear: boolean;
  failOnErrors: boolean;
  status: UploadStatus;
  message: string;
};

export type UploadErrorItem = {
  id: number;
  uploadId: number;
  originalFileName?: string;
  csvRowNumber?: number | null;
  columnName?: string | null;
  rawValue?: string | null;
  errorCode: string;
  errorMessage: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};

export type UploadBatchesFilters = {
  page?: number;
  size?: number;
  sourceType?: UploadSourceType;
  status?: UploadStatus;
  dataSourceCode?: string;
  sourceYear?: number;
  analysisYear?: number;
};

export type UploadErrorsFilters = {
  page?: number;
  size?: number;
};
