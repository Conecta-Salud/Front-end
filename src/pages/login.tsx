import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithFirebase } from "../services/auth/authService";
import { getCurrentUser } from "../services/auth/getCurrentUser";

import loginShape from "../assets/backgrounds/login_shape.png"
import ConectaSaludLogo from "../assets/ConectaSalud_Full.png";
import CustomInputField from "../components/CustomInputField/CustomInputField";
import Button from "../components/Button/Button";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const { token } = await loginWithFirebase(form.email, form.password);

      localStorage.setItem("token", token);

      const user = await getCurrentUser();

      console.log("Usuario desde BD local:", user);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
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
              placeholder="correo@ejemplo.com"
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
              label={loading ? "Cargando..." : "Continuar"}
              tone="green"
              height="60"
              textSize="lg"
              onClick={handleLogin}
            />
          </div>

          {error && (
            <p className="mt-4 text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          {/* Recuperar contraseña */}
          <button
            type="button"
            className="mt-[25px] text-[16px] font-medium"
            style={{
              backgroundImage: "var( --gradient-primary-blue)",
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