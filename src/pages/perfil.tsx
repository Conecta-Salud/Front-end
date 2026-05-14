import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button/Button";
import { useAuthStore } from "../stores/authStore";
import ProfileInfoCard from "../features/profile/components/ProfileInfoCard";
import { useLogoutMutation } from "../features/auth/mutations/useLogoutMutation";

function PerfilPage() {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <div>
        <Button
          label={status === "checking" ? "Cerrando..." : "Cerrar sesión"}
          tone="red"
          height="40"
          onClick={handleLogout}
        />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <ProfileInfoCard></ProfileInfoCard>
      </div>
    </div>
  );
}

export default PerfilPage;
