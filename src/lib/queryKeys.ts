export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    currentUser: () => [...queryKeys.auth.all, "current-user"] as const,
  },

  healthMap: {
    all: ["health-map"] as const,
    statesGeoJson: () => [...queryKeys.healthMap.all, "states-geojson"] as const,
    municipalitiesGeoJson: (stateCode: string) =>
      [...queryKeys.healthMap.all, "municipalities-geojson", stateCode] as const,
    stateIndicators: (indicator: string, year: string) =>
      [...queryKeys.healthMap.all, "state-indicators", indicator, year] as const,
    municipalityIndicators: (
      stateCode: string,
      indicator: string,
      year: string
    ) =>
      [
        ...queryKeys.healthMap.all,
        "municipality-indicators",
        stateCode,
        indicator,
        year,
      ] as const,
  },

  adminUploads: {
    all: ["admin-uploads"] as const,
    batches: (params?: {
      page?: number;
      size?: number;
      sourceType?: string;
      status?: string;
    }) =>
      [
        ...queryKeys.adminUploads.all,
        "batches",
        params?.page ?? 0,
        params?.size ?? 20,
        params?.sourceType ?? "all-source-types",
        params?.status ?? "all-statuses",
      ] as const,
    batchDetail: (batchId: number | null | undefined) =>
      [
        ...queryKeys.adminUploads.all,
        "batch-detail",
        batchId ?? "no-batch",
      ] as const,
    batchErrors: (
      batchId: number | null | undefined,
      page?: number,
      size?: number
    ) =>
      [
        ...queryKeys.adminUploads.all,
        "batch-errors",
        batchId ?? "no-batch",
        page ?? 0,
        size ?? 20,
      ] as const,
    uploadErrors: (
      uploadId: number | null | undefined,
      page?: number,
      size?: number
    ) =>
      [
        ...queryKeys.adminUploads.all,
        "upload-errors",
        uploadId ?? "no-upload",
        page ?? 0,
        size ?? 20,
      ] as const,
  },
};
