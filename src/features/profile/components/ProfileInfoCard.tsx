import { useState } from "react";

// ICONOS
import MedicalIcon from "../../../assets/icons/MedicalBriefcase.svg";
import PencilIcon from "../../../assets/icons/Pencil.svg";
import EyeIconOpen from "../../../assets/icons/eyeOpenIcon.svg";
import EyeIconClosed from "../../../assets/icons/eyeCloseIcon.svg";

interface ProfileInfoCardProps {
  title: string;
  lastLogin: string;
  email: string;
  institution: string;
  dependency: string;
  role: string;
  password: string;
  isLoading?: boolean;
  isError?: boolean;
}

interface InfoRowProps {
  label?: string;
  value?: string;
}

function InfoRow({ label = "Campo", value = "Sin información" }: InfoRowProps) {
  return (
    <div
      className="pb-2 border-b-2"
      style={{
        borderColor: "var(--color-green-end)",
      }}
    >
      <p
        className="text-[14px]"
        style={{
          color: "var(--color-green-end)",
          fontWeight: "var(--font-weight-semibold)",
        }}
      >
        {label}
      </p>

      <p
        className="text-[14px]"
        style={{
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        {value || "Sin información"}
      </p>
    </div>
  );
}

function ProfileInfoCard({
  title,
  lastLogin,
  email,
  dependency,
  role,
  password,
  isLoading = false,
  isError = false,
}: ProfileInfoCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (isLoading) {
    return (
      <div
        className="rounded-[28px] bg-white p-6 shadow-sm"
        style={{
          fontFamily: "var(--font-primary)",
        }}
      >
        <p className="text-[16px]">Cargando datos del usuario...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="rounded-[28px] bg-white p-6 shadow-sm"
        style={{
          fontFamily: "var(--font-primary)",
        }}
      >
        <p className="text-[16px] text-red-500">
          No se pudieron cargar los datos del usuario.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-[28px] p-6 shadow-sm bg-white"
      style={{
        fontFamily: "var(--font-primary)",
      }}
    >
      {/* HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl">
          <img src={MedicalIcon} alt="medical-icon" className="h-7 w-7" />
        </div>

        <h2
          className="text-[24px]"
          style={{
            color: "var(--color-green-end)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          Información
        </h2>
      </div>

      {/* USER INFO */}
      <div className="mb-6">
        <h1
          className="text-[24px]"
          style={{
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          {title || "Usuario"}
        </h1>

        <p
          className="text-[16px]"
          style={{
            color: "var(--color-text-secundary)",
          }}
        >
          {lastLogin}
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-4">
        <InfoRow label="Correo Institucional" value={email} />

        <InfoRow label="Dependencia" value={dependency} />

        <InfoRow label="Rol en el Sistema" value={role} />

        {/* PASSWORD */}
        <div
          className="pb-2 border-b-2"
          style={{
            borderColor: "var(--color-green-end)",
          }}
        >
          <p
            className="text-[14px]"
            style={{
              color: "var(--color-green-end)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Contraseña
          </p>

          <div className="flex items-center justify-between">
            <p
              className="text-[14px]"
              style={{
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {showPassword ? password : "*".repeat(password.length)}
            </p>

            <div className="flex items-center gap-4">
              {/* BOTON EDITAR */}
              <button className="transition hover:scale-110">
                <img src={PencilIcon} alt="edit-icon" className="h-5 w-5" />
              </button>

              {/* BOTON VER / OCULTAR */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="transition hover:scale-110"
              >
                <img
                  src={showPassword ? EyeIconClosed : EyeIconOpen}
                  alt="eye-icon"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoCard;
