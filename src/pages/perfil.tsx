import { useNavigate } from "react-router-dom";
import { useProfileInfo } from "../features/profile/hooks/useProfileInfo";

import Button from "../components/ui/Button/Button";
import ProfileInfoCard from "../features/profile/components/ProfileInfoCard";

import { useLogoutMutation } from "../features/auth/mutations/useLogoutMutation";

function PerfilPage() {
  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();
  const { profile, isLoading, isError } = useProfileInfo();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* TITULO */}
      <h1
        className="text-3xl"
        style={{
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        Perfil
      </h1>

      {/* CARD */}
      <ProfileInfoCard
        title={profile.title}
        lastLogin={profile.lastLogin}
        email={profile.email}
        institution={profile.institution}
        dependency={profile.dependency}
        role={profile.role}
        password={profile.password}
        isLoading={isLoading}
        isError={isError}
      />

      {/* BOTON */}
      <div className="flex justify-start">
        <Button
          label={logoutMutation.isPending ? "Cerrando..." : "Cerrar sesión"}
          tone="red"
          height="40"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default PerfilPage;
