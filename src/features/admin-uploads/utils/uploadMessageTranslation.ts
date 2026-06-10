const EXACT_MESSAGE_TRANSLATIONS: Record<string, string> = {
  "CLUES is duplicated in this file and was skipped":
    "CLUES está duplicado en este archivo y la fila fue omitida.",

  "Batch can only be processed while pending or warning":
    "El lote solo puede procesarse cuando está pendiente o en advertencia.",

  "Files can only be uploaded to pending or warning batches":
    "Solo se pueden subir archivos a lotes pendientes o en advertencia.",

  "Upload can only be validated while pending, warning or error":
    "El archivo solo puede validarse cuando está pendiente, en advertencia o en error.",

  "Batch has no uploaded files":
    "El lote no tiene archivos cargados.",

  "A file with the same checksum already exists in this batch":
    "Ya existe un archivo con el mismo contenido dentro de este lote.",

  "CSV file exceeds maximum allowed size":
    "El archivo CSV excede el tamaño máximo permitido.",

  "Only .csv files are accepted": "Solo se aceptan archivos .csv.",

  "LATITUD is outside the valid range":
    "LATITUD está fuera del rango válido.",

  "LONGITUD is outside the valid range":
    "LONGITUD está fuera del rango válido.",
};

const PARTIAL_MESSAGE_TRANSLATIONS: Array<[RegExp, string]> = [
  [/^(.+) is outside the valid range$/i, "$1 está fuera del rango válido."],
  [/^(.+) must be numeric$/i, "$1 debe ser numérico."],
  [/^(.+) is required$/i, "$1 es obligatorio."],
  [
    /^(.+) must be greater than or equal to zero$/i,
    "$1 debe ser mayor o igual a cero.",
  ],
];

export function translateUploadMessage(message?: string | null) {
  if (!message) return null;

  const normalized = message.trim();
  const exact = EXACT_MESSAGE_TRANSLATIONS[normalized];

  if (exact) {
    return exact;
  }

  for (const [pattern, replacement] of PARTIAL_MESSAGE_TRANSLATIONS) {
    if (pattern.test(normalized)) {
      return normalized.replace(pattern, replacement);
    }
  }

  return normalized;
}
