import { Routes, Route, Outlet } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

// PAGES
import Login from "./pages/login";
import Dashboard from "./pages/dashboard-estrategico";
import Comparison from "./pages/modulo-comparacion";
import Profile from "./pages/perfil";
import Admin from "./pages/panel-adminstrador";

function LayoutWrapper() {
  return (
    <AppLayout role="admin">
      <Outlet />
    </AppLayout>
  );
}

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;