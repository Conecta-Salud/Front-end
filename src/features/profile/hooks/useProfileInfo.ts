import { useMemo } from "react";
import { useCurrentUserQuery } from "../../auth/queries/useCurrentUserQuery";

export function useProfileInfo() {
  const query = useCurrentUserQuery();

  const profile = useMemo(() => {
    const user = query.data;

    const fullName = user
      ? [user.firstName, user.lastName].filter(Boolean).join(" ").trim()
      : "";

    const roleLabel =
      user?.role === "admin"
        ? "Administrador"
        : user?.role === "strategic"
        ? "Usuario estratégico"
        : "";

    return {
      title: fullName || "Usuario",
      lastLoginAt: user?.lastLoginAt ?? "Último ingreso no disponible",
      email: user?.email ?? "",
      dependency: user?.departmentName ?? "",
      role: roleLabel,
    };
  }, [query.data]);

  return {
    profile,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}