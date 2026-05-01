import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";


export function AdminRoute() {
  const user = useAuthStore((state) => state.user);

  if (user?.rol !== "administrador") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}