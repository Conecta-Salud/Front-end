import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { PrivateRoute } from "../routes/PrivateRoute";
import { AdminRoute } from "../routes/AdminRoute";
import { useAuthStore } from "../stores/authStore";
import { useCurrentUserQuery } from "../features/auth/queries/useCurrentUserQuery";

import AppLayout from "../layouts/AppLayout";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard_prueba";
import Comparison from "../pages/comparison_module";
import Profile from "../pages/perfil";
import Admin from "../pages/admin_panel";

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
    <Routes>
      <Route path="/login" element={<Login />} />x
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/profile" element={<Profile />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
