const MESSAGE_TRANSLATIONS: Record<string, string> = {
  "Batch can only be processed while pending or warning":
    "El lote solo puede procesarse cuando está pendiente o en advertencia.",
  "Files can only be uploaded to pending or warning batches":
    "Solo se pueden subir archivos a lotes pendientes o en advertencia.",
  "Upload can only be validated while pending, warning or error":
    "El archivo solo puede validarse cuando está pendiente, en advertencia o en error.",
  "LATITUD is outside the valid range":
    "LATITUD está fuera del rango válido.",
  "LONGITUD is outside the valid range":
    "LONGITUD está fuera del rango válido.",
};

export function translateUploadMessage(message?: string | null) {
  if (!message) return message ?? null;

  return MESSAGE_TRANSLATIONS[message] ?? message;
}