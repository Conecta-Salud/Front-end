import { useState } from "react";

import SearchBar from "../components/SearchBar/SearchBar";
import Filter from "../components/Filter/Filter";
import CustomInputField from "../components/CustomInputField/CustomInputField";

import CustomBarChart from "../components/BarChart/BarChart";
import RankingTableCard from "../components/RankingTable/RankingTableCard";
import RankingTableModal from "../components/RankingTable/RankingTableModal";

import { chartData } from "../mocks/barchart.mock";
import {
  rankingData,
  compactColumns,
  fullColumns,
} from "../mocks/rankingTable.mock";

function DashboardEstrategicoPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-[#F8F9FB] flex flex-col gap-6">
      {/* Vista simulada */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold mb-2">Dashboard Estratégico</h1>
        <p className="text-gray-600">
          Esta sección te sirve para validar cómo se ve el dashboard con contenido real.
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
              { name: "Cobertura Médica", value: "medica" },
              { name: "Hospitales", value: "hospitales" },
              { name: "Clínicas", value: "clinicas" },
            ]}
          />

          <Filter
            title="Año"
            values={year}
            onChange={setYear}
            options={[
              { name: "2022", value: "2022" },
              { name: "2023", value: "2023" },
              { name: "2024", value: "2024" },
              { name: "2025", value: "2025" },
              { name: "2026", value: "2026" },
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

      {/* Bar chart */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <CustomBarChart
          title="Estados vs médicos por 1000 habitantes"
          data={chartData}
          showAverageLine
        />
      </section>

      {/* Ranking resumido */}
      <section className="w-full max-w-[600px]">
        <RankingTableCard
          title="Unidades médicas en Cuernavaca"
          columns={compactColumns}
          data={rankingData}
          footerText="Ver ranking completo"
          onFooterClick={() => setIsModalOpen(true)}
        />
      </section>

      {/* Modal completo */}
      <RankingTableModal
        isOpen={isModalOpen}
        title="Unidades médicas en Cuernavaca"
        columns={fullColumns}
        data={rankingData}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default DashboardEstrategicoPage;