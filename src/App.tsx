import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Filter from "./components/Filter/Filter";
import CustomInputField from "./components/CustomInputField/CustomInputField";
import BarChart from "../src/components/BarChart graphic/BarChart";

import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

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

  // ✅ DATA FUERA DEL RETURN
  const dummyData = [
    { estado: "Nuevo León", valor: 3.8 },
    { estado: "CDMX", valor: 3.6 },
    { estado: "Querétaro", valor: 3.4 },
    { estado: "Jalisco", valor: 3.2 },
    { estado: "Michoacán", valor: 3.1 },
    { estado: "Morelos", valor: 2.8 },
    { estado: "Guerrero", valor: 2.7 },
    { estado: "Oaxaca", valor: 2.6 },
    { estado: "Chiapas", valor: 2.5 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header subtitle="Panel Usuario Estratégico" />

      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold underline">Hello, World!</h1>

        {/* FORM */}
        <div className="flex flex-col gap-4 max-w-md">
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

        {/* FILTROS + SEARCH */}
        <div className="flex items-center gap-4 flex-wrap">
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

        {/* GRÁFICA */}
        <BarChart data={dummyData} />

        {/* DEBUG INFO */}
        <div className="text-sm text-gray-600">
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
      </div>
    </div>
  );
}

export default App;
