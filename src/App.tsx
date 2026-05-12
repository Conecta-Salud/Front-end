import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { useAuthStore } from "./stores/authStore";
import AppLayout from "./layouts/AppLayout";

// PAGES
import Login from "./pages/login";
import Dashboard from "./pages/dashboard-estrategico";
import Comparison from "./pages/comparison";
import Profile from "./pages/perfil";
import Admin from "./pages/panel-adminstrador";
import { useEffect } from "react";

function LayoutWrapper() {
  const user = useAuthStore((state) => state.user);

  return (
    <AppLayout role={user?.rol ?? "estrategico"}>
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
  );
}

export default App;