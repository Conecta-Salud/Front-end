import { useMemo } from "react";
import { useCurrentUserQuery } from "../../auth/queries/useCurrentUserQuery";

const getRoleLabel = (role?: string | null) => {
  if (role === "admin") return "Administrador";
  if (role === "strategic") return "Usuario estratégico";

  return "";
};

export function useProfileInfo() {
  const query = useCurrentUserQuery();

  const profile = useMemo(() => {
    const user = query.data;

    const fullName = user
      ? [user.firstName, user.lastName].filter(Boolean).join(" ").trim()
      : "";

    const roleLabel = getRoleLabel(user?.role);

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
