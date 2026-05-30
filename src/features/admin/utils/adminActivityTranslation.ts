import {
  ADMIN_ACTIVITY_ACTION_LABELS,
  ADMIN_ACTIVITY_MODULE_LABELS,
  ADMIN_ACTIVITY_RESULT_LABELS,
} from "../constants/adminDisplay.constants";

const toUpperSnakeCase = (value: string) => {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .replace(/_+/g, "_")
    .toUpperCase();
};

const toLowerSnakeCase = (value: string) => {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
};

const translateWithFallback = (
  value: string | null | undefined,
  dictionary: Record<string, string>,
  normalizer: (value: string) => string
) => {
  if (!value) return "—";

  const directMatch = dictionary[value];

  if (directMatch) return directMatch;

  const normalizedValue = normalizer(value);
  const normalizedMatch = dictionary[normalizedValue];

  if (normalizedMatch) return normalizedMatch;

  return value;
};

export const translateAdminActivityAction = (
  action: string | null | undefined
) => {
  return translateWithFallback(
    action,
    ADMIN_ACTIVITY_ACTION_LABELS,
    toUpperSnakeCase
  );
};

export const translateAdminActivityModule = (
  module: string | null | undefined
) => {
  return translateWithFallback(
    module,
    ADMIN_ACTIVITY_MODULE_LABELS,
    toLowerSnakeCase
  );
};

export const translateAdminActivityResult = (
  result: string | null | undefined
) => {
  return translateWithFallback(
    result,
    ADMIN_ACTIVITY_RESULT_LABELS,
    toLowerSnakeCase
  );
};