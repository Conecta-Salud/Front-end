import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUserQuery } from "../features/auth/queries/useCurrentUserQuery";

export function AdminRoute() {
  const { data: user, isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <div>Cargando permisos...</div>;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
