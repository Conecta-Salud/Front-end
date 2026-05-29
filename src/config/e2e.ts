import type { UserRole } from "../services/auth/currentUser.api";

const E2E_AUTH_BYPASS_KEY = "conectasalud:e2e-auth-bypass";
const E2E_AUTH_ROLE_KEY = "conectasalud:e2e-auth-role";

function canUseE2EBypass() {
  return import.meta.env.DEV && typeof window !== "undefined";
}

export function isE2EAuthBypassEnabled() {
  return (
    canUseE2EBypass() &&
    window.localStorage.getItem(E2E_AUTH_BYPASS_KEY) === "true"
  );
}

export function getE2EUserRole(): UserRole {
  if (!canUseE2EBypass()) return "strategic";

  return window.localStorage.getItem(E2E_AUTH_ROLE_KEY) === "admin"
    ? "admin"
    : "strategic";
}

export function getE2ECurrentUser() {
  const role = getE2EUserRole();

  return {
    id: "e2e-user",
    departmentId: 1,
    departmentName: "Dirección General de Salud Digital",
    firstName: role === "admin" ? "Admin" : "Usuario",
    lastName: "E2E",
    email: `${role}@conectasalud.test`,
    firebaseUuid: "e2e-firebase-user",
    role,
    lastLoginAt: "2026-05-28T18:00:00.000Z",
  };
}
