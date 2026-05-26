import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/mutations/useLoginMutation";

import loginShape from "../assets/backgrounds/login_shape.png"
import ConectaSaludLogo from "../assets/ConectaSalud_Full.png";
import CustomInputField from "../components/ui/CustomInputField/CustomInputField";
import Button from "../components/ui/Button/Button";

function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await loginMutation.mutateAsync({
        email: form.email,
        password: form.password,
      });

      navigate("/", { replace: true });
    } catch {
      // El estado de la mutacion muestra el mensaje de error debajo del boton.
    }
  };

  return (
    <main className="grid min-h-screen grid-cols-[30%_70%] bg-white">
      {/* LADO IZQUIERDO */}
      <div className="relative overflow-hidden">
        <img
          src={loginShape}
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-auto select-none pointer-events-none"
        />
      </div>

      {/* LADO DERECHO */}
      <section className="flex min-h-screen items-center justify-center px-10">
        <div className="flex w-full max-w-[578px] flex-col items-center">
          
          {/* Logo */}
          <img
            src={ConectaSaludLogo}
            alt="Logo ConectaSalud"
            className="mb-[24px] w-[255px] h-auto"
          />

          {/* Título */}
          <h1
            className="mb-[50px] text-center text-[64px] font-bold leading-none"
            style={{
              backgroundImage: "var(--gradient-primary-green)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Inicio de Sesión
          </h1>

          {/* Inputs */}
          <div className="flex w-full flex-col gap-[30px]">
            <CustomInputField
              name="email"
              label="Correo"
              type="email"
              placeholder="correo@conectasalud.mx"
              value={form.email}
              onChange={(value) => handleChange("email", value)}
            />

            <CustomInputField
              name="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              value={form.password}
              onChange={(value) => handleChange("password", value)}
            />
          </div>

          {/* Botón */}
          <div className="mt-[70px] flex justify-center">
            <Button
              label={loginMutation.isPending ? "Entrando..." : "Continuar"}
              tone="green"
              height="60"
              textSize="lg"
              disabled={loginMutation.isPending}
              onClick={handleSubmit}
            />
          </div>

          {loginMutation.isError && (
            <p className="mt-4 text-sm font-medium text-red-500">
              Correo o contraseña incorrectos.
            </p>
          )}

          {/* Recuperar contraseña */}
          <button
            type="button"
            className="mt-[25px] text-[16px] font-medium"
            style={{
              backgroundImage: "var(--gradient-primary-blue)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            ¿Olvidaste la contraseña?
          </button>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
