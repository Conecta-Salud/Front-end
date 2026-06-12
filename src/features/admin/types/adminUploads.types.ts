export type AdminUploadDataset = "establishments" | "indicators" | "sectorials";

export type AdminUploadOption = {
  value: AdminUploadDataset;
  label: string;
  endpoint: string;
};

export type AdminUploadPayload = {
  dataset: AdminUploadDataset;
  file: File;
};
