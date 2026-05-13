import { useState } from "react";

import CustomInputField from "../components/CustomInputField/CustomInputField";
import Button from "../components/Button/Button";
import CustomKPI from "../components/KPI/CustomKPI";

import CustomBarChart from "../components/BarChart/BarChart";
import RankingTableCard from "../components/RankingTable/RankingTableCard";
import RankingTableModal from "../components/RankingTable/RankingTableModal";
import ComparisonBarChart from "../components/ComparisonChart/ComparisonChart";
import CustomPieChart from "../components/PieChart/PieChart";
import PriorityCard from "../components/Priority/PriorityCard";
import ImportButton from "../components/ImportButton/ImportButton";
import LocationInput, { type LocationOption } from "../components/LocationInput/LocationInput";

import { chartData } from "../mocks/barchart.mock";
import {
  rankingData,
  compactColumns,
  fullColumns,
} from "../mocks/rankingTable.mock";
import { coberturaData, coberturaRules } from "../mocks/comparisonchart.mocks";
import { data } from "../mocks/piechart.mock";
import { data1, data2 } from "../mocks/prioritycard.mock";
import { locationOptionsMock } from "../mocks/locationinput.mock";


function DashboardEstrategicoPage() {
  const [location, setLocation] = useState<LocationOption | null>(null);

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
          Esta sección te sirve para validar cómo se ve el dashboard con
          contenido real.
        </p>
      </section>

      <div className="flex items-center gap-4 flex-wrap">
        <Button
          label="Nuevo Usuario"
          tone="green"
          height="40"
          buttonType="add"
        />
        <Button
          label="Exportar"
          tone="blue"
          height="40"
          buttonType="download"
        />
        <Button label="Cancelar" tone="red" height="40" />
        <Button label="Continuar" tone="green" height="40" />
        <Button label="Continuar" tone="green" height="60" textSize="lg" />
        <ImportButton />
      </div>

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

      {/* Bar chart */}
      <CustomBarChart
        title="Estados vs médicos por 1000 habitantes"
        data={chartData}
        showAverageLine
      />

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

      <div className="grid grid-cols-4 gap-4">
        <CustomKPI
          title="Usuarios registrados"
          value="151"
          variant="green"
          size="sm"
          fullWidth
        />
        <CustomKPI
          title="Usuarios activos"
          subtitle="(últimos 7 días)"
          value="34"
          size="sm"
          fullWidth
        />
        <CustomKPI
          title="Comparaciones realizadas"
          value="76"
          size="sm"
          fullWidth
        />
        <CustomKPI title="Reportes exportados" value="24" size="sm" fullWidth />
      </div>

      <div className="grid grid-cols-4 gap-[18px]">
        <div className="flex flex-col gap-4">
          <CustomKPI
            title="Promedio médicos"
            titleSecondLine="por 1000 habitantes"
            value="2.5"
            variant="green"
            size="sm"
            fullWidth
          />
          <CustomKPI
            title="Estados"
            titleSecondLine="críticos"
            value="8"
            variant="red"
            size="sm"
            fullWidth
          />
        </div>

        <div className="flex flex-col gap-4">
          <CustomKPI
            title="Promedio médicos"
            titleSecondLine="por 1000 habitantes"
            value="2.5"
            size="md"
            fullWidth
          />
          <CustomKPI
            title="Estados"
            titleSecondLine="críticos"
            value="8"
            variant="red"
            size="md"
            fullWidth
          />
        </div>
      </div>

      <ComparisonBarChart
        title="Cobertura médica"
        data={coberturaData}
        rules={coberturaRules}
        referenceLine={{
          value: 2.3,
          label: "Referencia mínima OMS / 2.3",
        }}
        yDomain={[0, 3.5]}
      />

      <CustomPieChart
        data={data}
        title="Distribución de Equipos"
        isAnimationActive={true}
      />

      <div className="grid grid-cols-4 gap-[18px]">
        <PriorityCard
          title="Cuernavaca"
          subtitle="(Morelos)"
          priority="alta"
          progress={96}
          metrics={data1}
        />

        <PriorityCard
          title="Zapopan"
          subtitle="(Jalisco)"
          priority="baja"
          progress={22}
          metrics={data2}
        />
        <PriorityCard
          title="Zapopan"
          subtitle="(Jalisco)"
          priority="media"
          progress={22}
          metrics={data2}
        />
      </div>

      <LocationInput
        value={location}
        options={locationOptionsMock}
        placeholder="Selecciona estado o municipio"
        onChange={setLocation}
        onClear={() => console.log('Ubicación limpiada')}
      />
    </div>
  );
}

export default DashboardEstrategicoPage;
