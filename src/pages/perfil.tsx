import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button/Button";
import { useAuthStore } from "../stores/authStore";

function PerfilPage() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const status = useAuthStore((state) => state.status);

  const handleLogout = async () => {
    try {
      await logout(); // si es async, si no, igual funciona
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button
        label={status === "checking" ? "Cerrando..." : "Cerrar sesión"}
        tone="red"
        height="40"
        onClick={handleLogout}
      />
    </div>
  );
}

export default PerfilPage;