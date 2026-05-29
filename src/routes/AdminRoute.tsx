import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUserQuery } from "../features/auth/queries/useCurrentUserQuery";
import { isE2EAuthBypassEnabled } from "../config/e2e";

export function AdminRoute() {
  const { data: user, isLoading } = useCurrentUserQuery();

  if (isE2EAuthBypassEnabled()) {
    return <Outlet />;
  }

  if (isLoading) {
    return <div>Cargando permisos...</div>;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
