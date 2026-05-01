import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export function PrivateRoute() {
  const status = useAuthStore((state) => state.status);

  if (status === "checking") return <div>Cargando...</div>;

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}