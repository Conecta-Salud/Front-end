import React, { useState } from 'react';
import Header from '../components/Header/Header';
import HeaderActions from '../components/Header/HeaderActions';
import ComparisonChart from '../components/ComparisonChart/ComparisonChart';
import LocationInput from '../components/LocationInput/LocationInput';
import PriorityCard from '../components/Priority/PriorityCard';
import Export from '../components/Export/Export'; 
// @ts-ignore
import Button from '../components/Button/Button'; 

const RULES = [
  { max: 1.5, tone: "red" as const },
  { min: 1.6, tone: "green" as const },
];

export default function ModuloComparacionPage() {
  // 1. ESTADO DEL AÑO: Este valor controla el título y el selector del Header
  const [selectedYear, setSelectedYear] = useState("2026");

  // 2. ESTADOS DE BÚSQUEDA Y CONFIRMACIÓN
  const [loc1, setLoc1] = useState({ nombre: "Cuernavaca", estado: "Morelos" });
  const [loc2, setLoc2] = useState({ nombre: "Zapopan", estado: "Jalisco" });
  const [confirmedLoc1, setConfirmedLoc1] = useState({ nombre: "Cuernavaca", estado: "Morelos" });
  const [confirmedLoc2, setConfirmedLoc2] = useState({ nombre: "Zapopan", estado: "Jalisco" });

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [hasData, setHasData] = useState(true);

  const handleCompare = () => {
    if (!loc1.nombre.trim() || !loc2.nombre.trim()) {
      setHasData(false);
      return;
    }
    setConfirmedLoc1({ ...loc1 });
    setConfirmedLoc2({ ...loc2 });
    setHasData(true);
  };

  const getChartData = (val1: number, val2: number) => {
    if (!hasData) return [];
    return [
      { label: confirmedLoc1.nombre || 'Ubicación 1', value: val1, subtitle: confirmedLoc1.estado ? `(${confirmedLoc1.estado})` : "" },
      { label: confirmedLoc2.nombre || 'Ubicación 2', value: val2, subtitle: confirmedLoc2.estado ? `(${confirmedLoc2.estado})` : "" },
    ];
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* HEADER: Le inyectamos los HeaderActions directamente */}
      <Header 
        subtitle="Panel Usuario Estratégico"
        actions={
          <HeaderActions 
            showYearFilter={true}
            year={selectedYear} 
            onYearChange={(year) => setSelectedYear(year || "2026")}
            showCategoryFilter={true}
            category="cobertura_medica"
          />
        }
      />

      <div className="p-8 flex-1">
        
        {/* TÍTULO DINÁMICO: Se actualiza en cuanto cambia 'selectedYear' */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Módulo de Comparación
            </h1>
            <p className="text-gray-500 font-semibold mt-1">
              Búsqueda de indicadores de salud | {selectedYear}
            </p>
          </div>
          <Button 
            label="Exportar" 
            buttonType="download" 
            tone="blue" 
            height="40" 
            onClick={() => setIsExportOpen(true)} 
          />
        </div>

        {/* BUSCADORES */}
        <div className="flex items-center gap-6 mb-10 bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
          <div className="flex-1">
            <LocationInput 
              text1={loc1.nombre} text2={loc1.estado} 
              onClear={() => setLoc1({ nombre: "", estado: "" })} 
              onChangeText1={(val) => setLoc1({ ...loc1, nombre: val })}
              onChangeText2={(val) => setLoc1({ ...loc1, estado: val })}
            />
          </div>
          
          <Button label="COMPARAR" tone="green" height="60" className="px-10" onClick={handleCompare} />

          <div className="flex-1">
            <LocationInput 
              text1={loc2.nombre} text2={loc2.estado} 
              onClear={() => setLoc2({ nombre: "", estado: "" })}
              onChangeText1={(val) => setLoc2({ ...loc2, nombre: val })}
              onChangeText2={(val) => setLoc2({ ...loc2, estado: val })}
            />
          </div>
        </div>

        {/* GRÁFICAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <ComparisonChart title="Cobertura Médica" data={getChartData(0.7, 2.9)} rules={RULES} chartHeight={220} />
          <ComparisonChart title="Déficit de médicos" data={getChartData(1.1, 2.4)} rules={RULES} chartHeight={220} />
          <ComparisonChart title="Camas hospitalarias" data={getChartData(0.9, 1.5)} rules={RULES} chartHeight={220} />
          <ComparisonChart title="Población en pobreza" data={getChartData(2.5, 0.8)} rules={RULES} chartHeight={220} />
        </div>

        {/* ÍNDICE DE PRIORIDAD */}
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50">
          <h2 className="text-center text-[#4FD1C5] text-2xl font-black mb-10 uppercase tracking-[0.2em]">
            Índice de Prioridad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <PriorityCard 
              title={confirmedLoc1.nombre || "Ubicación 1"} 
              subtitle={confirmedLoc1.estado} 
              priority="alta" progress={85} metrics={[]} 
            />
            <PriorityCard 
              title={confirmedLoc2.nombre || "Ubicación 2"} 
              subtitle={confirmedLoc2.estado} 
              priority="baja" progress={25} metrics={[]} 
            />
          </div>
        </div>
      </div>

      <Export 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        onExport={() => setIsExportOpen(false)} 
      />
    </div>
  );
}