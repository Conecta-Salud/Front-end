type RequiredEnvKey =
  | "VITE_API_URL"
  | "VITE_FIREBASE_API_KEY"
  | "VITE_FIREBASE_AUTH_DOMAIN"
  | "VITE_FIREBASE_PROJECT_ID"
  | "VITE_FIREBASE_STORAGE_BUCKET"
  | "VITE_FIREBASE_MESSAGING_SENDER_ID"
  | "VITE_FIREBASE_APP_ID";

const CLOUD_BUILD_PLACEHOLDER = "SET_IN_CLOUD_BUILD_TRIGGER";

function getRequiredEnv(key: RequiredEnvKey) {
  const value = import.meta.env[key]?.trim();

  if (!value || value === CLOUD_BUILD_PLACEHOLDER) {
    throw new Error(
      `Missing required environment variable: ${key}. Check your local .env file or Cloud Build substitutions.`
    );
  }

  return value;
}

function getRequiredUrl(key: RequiredEnvKey) {
  const value = getRequiredEnv(key);

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Environment variable ${key} must be a valid URL.`);
  }
}

export const env = {
  apiUrl: getRequiredUrl("VITE_API_URL"),
  firebase: {
    apiKey: getRequiredEnv("VITE_FIREBASE_API_KEY"),
    authDomain: getRequiredEnv("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: getRequiredEnv("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: getRequiredEnv("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getRequiredEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: getRequiredEnv("VITE_FIREBASE_APP_ID"),
  },
} as const;
