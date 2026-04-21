import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Filter from "./components/Filter/Filter";
import CustomInputField from "./components/CustomInputField/CustomInputField";
import Sidebar from "./components/SideBar/SideBar";

import { useState } from "react";

type SidebarItemId = "dashboard" | "comparison" | "admin" | "profile";
type UserRole = "user" | "admin";

const HEADER_HEIGHT = 120;
const SIDEBAR_WIDTH = 100;

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  const [role, setRole] = useState<UserRole>("admin");
  const [activeItem, setActiveItem] = useState<SidebarItemId>("dashboard");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderViewTitle = () => {
    switch (activeItem) {
      case "dashboard":
        return "Dashboard Estratégico";
      case "comparison":
        return "Módulo de Comparación";
      case "admin":
        return "Panel Administrador";
      case "profile":
        return "Perfil";
      default:
        return "Vista";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header fijo arriba */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        <Header subtitle={`Panel ${renderViewTitle()}`} />
      </div>

      {/* Sidebar fijo debajo del header */}
      <div
        className="fixed left-0 z-40"
        style={{
          top: `${HEADER_HEIGHT}px`,
          width: `${SIDEBAR_WIDTH}px`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <Sidebar
          role={role}
          activeItem={activeItem}
          onChange={setActiveItem}
          profileLabel="Perfil"
          showProfileLabel={false}
        />
      </div>

      {/* Contenido principal */}
      <main
        className="bg-[#F8F9FB] p-6 flex flex-col gap-6"
        style={{
          marginTop: `${HEADER_HEIGHT}px`,
          marginLeft: `${SIDEBAR_WIDTH}px`,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {/* Controles de prueba */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Sandbox del Sidebar</h2>

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              className={`px-4 py-2 rounded-lg border ${
                role === "user"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
              onClick={() => {
                setRole("user");
                if (activeItem === "admin") setActiveItem("dashboard");
              }}
            >
              Rol: user
            </button>

            <button
              className={`px-4 py-2 rounded-lg border ${
                role === "admin"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
              onClick={() => setRole("admin")}
            >
              Rol: admin
            </button>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Vista activa:</strong> {activeItem}
            </p>
            <p>
              <strong>Rol actual:</strong> {role}
            </p>
          </div>
        </section>

        {/* Vista simulada */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold mb-2">{renderViewTitle()}</h1>
          <p className="text-gray-600">
            Esta sección te sirve para validar cómo se ve el sidebar junto con
            contenido real.
          </p>
        </section>

        {/* Inputs */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Prueba de Inputs</h2>

          <div className="flex flex-col gap-4 max-w-xl">
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
        </section>

        {/* Filtros y búsqueda */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Prueba de filtros</h2>

          <div className="flex items-center gap-4 flex-wrap mb-4">
            <Filter
              title="Categoría"
              values={category}
              onChange={setCategory}
              options={[
                { label: "Cobertura Médica", value: "medica" },
                { label: "Hospitales", value: "hospitales" },
                { label: "Clínicas", value: "clinicas" },
              ]}
            />

            <Filter
              title="Año"
              values={year}
              onChange={setYear}
              options={[
                { label: "2022", value: "2022" },
                { label: "2023", value: "2023" },
                { label: "2024", value: "2024" },
                { label: "2025", value: "2025" },
                { label: "2026", value: "2026" },
              ]}
            />

            <SearchBar
              searchTerm={search}
              onSearch={setSearch}
              placeholder="Ingrese el estado o municipio..."
            />
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Search:</strong> {search}
            </p>
            <p>
              <strong>Categoría:</strong> {category}
            </p>
            <p>
              <strong>Año:</strong> {year}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;