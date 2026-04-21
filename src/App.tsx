import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Filter from "./components/Filter/Filter";
import CustomInputField from "./components/CustomInputField/CustomInputField";
import BarChart from "./components/BarChart/BarChart";
import RankingTableCard from "./components/RankingTable/RankingTableCard";
import RankingTableModal from "./components/RankingTable/RankingTableModal";

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
    { label: "Nuevo León", value: 3.8 },
    { label: "CDMX", value: 3.6 },
    { label: "Querétaro", value: 3.4 },
    { label: "Jalisco", value: 3.2 },
    { label: "Michoacán", value: 3.1 },
    { label: "Morelos", value: 2.8 },
    { label: "Guerrero", value: 2.7 },
    { label: "Oaxaca", value: 2.6 },
    { label: "Chiapas", value: 2.5 },
    { label: "Chiapas", value: 2.5 },
    { label: "Nuevo León", value: 3.8 },
    { label: "CDMX", value: 3.6 },
    { label: "Querétaro", value: 3.4 },
    { label: "Jalisco", value: 3.2 },
    { label: "Michoacán", value: 3.1 },
    { label: "Morelos", value: 2.8 },
    { label: "Guerrero", value: 2.7 },
    { label: "Oaxaca", value: 2.6 },
    { label: "Chiapas", value: 2.5 },
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
        <BarChart 
          data={dummyData}
          chartHeight={510}
        />

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
