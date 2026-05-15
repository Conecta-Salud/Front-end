import { useCurrentUserQuery } from "../../auth/queries/useCurrentUserQuery";

export function useProfileInfo() {
  const query = useCurrentUserQuery();

  const user = query.data;

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "";

  const roleLabel =
    user?.role === "admin"
      ? "Administrador"
      : user?.role === "strategic"
      ? "Usuario estratégico"
      : "";

  return {
    profile: {
      title: fullName,
      lastLogin: "Último ingreso pendiente",
      email: user?.email ?? "",
      institution: "Pendiente de backend",
      dependency: user?.departmentName ?? "",
      role: roleLabel,
      password: "*******",
    },
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
