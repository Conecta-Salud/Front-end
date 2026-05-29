import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useCurrentUserQuery } from "../features/auth/queries/useCurrentUserQuery";
import { isE2EAuthBypassEnabled } from "../config/e2e";

export function PrivateRoute() {
  const status = useAuthStore((state) => state.status);
  const currentUserQuery = useCurrentUserQuery();

  if (isE2EAuthBypassEnabled()) {
    return <Outlet />;
  }

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (currentUserQuery.isLoading) {
    return <div>Cargando perfil...</div>;
  }

  if (currentUserQuery.isError || !currentUserQuery.data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
