import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button/Button";
import ProfileInfoCard from "../features/profile/components/ProfileInfoCard";
import ChangePasswordModal from "../features/profile/components/ChangePasswordModal";
import { useProfileInfo } from "../features/profile/hooks/useProfileInfo";
import { useLogoutMutation } from "../features/auth/mutations/useLogoutMutation";
import ConfirmModal from "../components/ui/ConfirmModal/ConfirmModal";

const formatDateTimeEs = (value?: string | null) => {
  if (!value) return "Sin registro";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha inválida";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

function PerfilPage() {
  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();
  const { profile, isLoading, isError } = useProfileInfo();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    if (logoutMutation.isPending) return;

    try {
      setLogoutError(null);

      await logoutMutation.mutateAsync();

      navigate("/login", {
        replace: true,
      });
    } catch {
      setLogoutError("No se pudo cerrar la sesión. Intenta nuevamente.");
    }
  };

  return (
    <main className="min-h-full p-6">
      <section className="mb-6">
        <h1 className="text-[28px] font-bold leading-tight text-black">
          Perfil
        </h1>

        <p className="text-[16px] text-black">
          Consulta tu información de usuario y administra tu sesión.
        </p>
      </section>

      <div className="w-full">
        <ProfileInfoCard
          title={profile.title}
          lastLoginAt={formatDateTimeEs(profile.lastLoginAt)}
          email={profile.email}
          dependency={profile.dependency}
          role={profile.role}
          isLoading={isLoading}
          isError={isError}
          onEditPassword={() => setIsPasswordModalOpen(true)}
        />

        {logoutError && (
          <div className="mt-4 rounded-[10px] bg-white p-4 shadow-sm">
            <p className="text-[16px] text-red-500">{logoutError}</p>
          </div>
        )}

        <div className="mt-6 flex justify-start">
          <Button
            label={logoutMutation.isPending ? "Cerrando..." : "Cerrar sesión"}
            tone="red"
            height="40"
            onClick={() => setIsLogoutModalOpen(true)}
            disabled={logoutMutation.isPending}
          />
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Cerrar sesión"
        description="¿Seguro que deseas cerrar tu sesión actual?"
        confirmLabel="Cerrar sesión"
        tone="red"
        isPending={logoutMutation.isPending}
        onClose={() => {
          if (!logoutMutation.isPending) {
            setIsLogoutModalOpen(false);
          }
        }}
        onConfirm={handleLogout}
      />
    </main>
  );
}

export default PerfilPage;
