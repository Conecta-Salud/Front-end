import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import { PrivateRoute } from "../routes/PrivateRoute";
import { AdminRoute } from "../routes/AdminRoute";
import { useAuthStore } from "../stores/authStore";
import { useCurrentUserQuery } from "../features/auth/queries/useCurrentUserQuery";
// leyenda
import AppLayout from "../layouts/AppLayout";

const Login = lazy(() => import("../pages/login"));
const Dashboard = lazy(() => import("../pages/dashboard_prueba"));
const Comparison = lazy(() => import("../pages/comparison_module"));
const Profile = lazy(() => import("../pages/perfil"));
const Admin = lazy(() => import("../pages/admin_panel"));

function PageFallback() {
  return <div>Cargando...</div>;
}

function LayoutWrapper() {
  const { data: user } = useCurrentUserQuery();

  return (
    <AppLayout role={user?.role ?? "strategic"}>
      <Outlet />
    </AppLayout>
  );
}

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return unsubscribe;
  }, [initializeAuth]);

  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/profile" element={<Profile />} />

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
