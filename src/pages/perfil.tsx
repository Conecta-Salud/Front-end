import React from 'react';
import { useNavigate } from "react-router-dom";
import AppLayout from '../layouts/AppLayout';
import CustomInputField from '../components/CustomInputField/CustomInputField';
import Button from "../components/Button/Button";
// @ts-ignore
import folderIcon from "../assets/icons/folderIcon.svg";
import { useAuthStore } from "../stores/authStore";

const USER_DATA = {
  name: "Claudia Sheinbaum Pardo",
  lastLogin: "9-03-2026 19:11:30",
  email: "claudia.sheinbaum@salud.gob.mx",
  institution: "Secretaría de la Salud",
  dependency: "Dirección de la Planeación",
  role: "Usuario Estratégico",
};

function PerfilPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const status = useAuthStore((state) => state.status);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AppLayout role="user">
      <div className="max-w-4xl mx-auto py-4">
        <h1 className="text-3xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
          Perfil
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-10">
          <div className="flex items-center gap-3 mb-8">
            {/* Implementación del icono importado */}
            <img 
              src={folderIcon} 
              alt="info" 
              className="w-8 h-8 object-contain" 
            />
            <h2 className="text-[#4FD1C5] text-xl font-semibold m-0">Información</h2>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-black m-0">{USER_DATA.name}</h3>
            <p className="text-gray-400 text-sm mt-1">Último ingreso: {USER_DATA.lastLogin}</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <CustomInputField 
              name="email" 
              label="Correo Institucional" 
              value={USER_DATA.email} 
              readOnly 
            />
            <CustomInputField 
              name="institution" 
              label="Institución" 
              value={USER_DATA.institution} 
              readOnly 
            />
            <CustomInputField 
              name="dependency" 
              label="Dependencia" 
              value={USER_DATA.dependency} 
              readOnly 
            />
            <CustomInputField 
              name="role" 
              label="Rol en el Sistema" 
              value={USER_DATA.role} 
              readOnly 
            />
            <CustomInputField 
              name="password" 
              label="Contraseña" 
              value="********" 
              type="password" 
              readOnly 
            />
          </div>
        </div>

        <div className="mt-8">
          <Button
            label={status === "checking" ? "Cerrando..." : "Cerrar sesión"}
            tone="red"
            height="50"
            onClick={handleLogout}
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default PerfilPage;