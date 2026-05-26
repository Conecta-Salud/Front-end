import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import { useAuthStore } from "../stores/authStore";

const Login = lazy(() => import("../pages/login"));
const Dashboard = lazy(() => import("../pages/dashboard_prueba"));
const Comparison = lazy(() => import("../pages/comparison_module"));
const Profile = lazy(() => import("../pages/perfil"));
const Admin = lazy(() => import("../pages/admin_panel"));
const ProtectedLayout = lazy(() => import("./ProtectedLayout"));
const PrivateRoute = lazy(() =>
  import("../routes/PrivateRoute").then((module) => ({
    default: module.PrivateRoute,
  }))
);
const AdminRoute = lazy(() =>
  import("../routes/AdminRoute").then((module) => ({
    default: module.AdminRoute,
  }))
);

function PageFallback() {
  return <div>Cargando...</div>;
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
          <Route element={<ProtectedLayout />}>
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
