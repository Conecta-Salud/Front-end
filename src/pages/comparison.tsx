import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import ComparisonChart from '../components/ComparisonChart/ComparisonChart';
import LocationInput from '../components/LocationInput/LocationInput';
import PriorityCard from '../components/Priority/PriorityCard';
import Export from '../components/Export/Export'; 
// @ts-ignore
import Button from '../components/Button/Button'; 

const MOCK_DATA = [
  { label: 'Cuernavaca', value: 0.7, subtitle: '(Morelos)' },
  { label: 'Zapopan', value: 2.9, subtitle: '(Jalisco)' },
];

const RULES = [
  { max: 1.5, tone: "red" as const },
  { min: 1.6, tone: "green" as const },
];

export default function ModuloComparacionPage() {
  const [loc1, setLoc1] = useState({ nombre: "Cuernavaca", estado: "Morelos" });
  const [loc2, setLoc2] = useState({ nombre: "Zapopan", estado: "Jalisco" });
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleCompare = () => console.log("Comparando...");

  const handleExportAction = (format: string) => {
    console.log("Formato seleccionado para exportar:", format);
    
    setTimeout(() => {
      console.log("Exportación completada.");
      setIsExportOpen(false);
    }, 3000);
  };

  return (
    <AppLayout role="user">
      <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Módulo de Comparación</h1>
            <p className="text-gray-500 font-semibold mt-1">
              Elige dos estados o municipios del mismo nivel territorial para comparar | 2026
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
              text1={loc1.nombre} 
              text2={loc1.estado} 
              onClear={() => setLoc1({ nombre: "", estado: "" })} 
            />
          </div>
          
          <Button 
            label="COMPARAR"
            tone="green"
            height="60"
            textSize="lg"
            className="px-10 uppercase tracking-wider"
            onClick={handleCompare}
          />

          <div className="flex-1">
            <LocationInput 
              text1={loc2.nombre} 
              text2={loc2.estado} 
              onClear={() => setLoc2({ nombre: "", estado: "" })} 
            />
          </div>
        </div>

        {/* GRÁFICAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <ComparisonChart title="Cobertura Médica" data={MOCK_DATA} rules={RULES} chartHeight={220} />
          <ComparisonChart title="Déficit de médicos" data={MOCK_DATA} rules={RULES} chartHeight={220} />
          <ComparisonChart title="Camas hospitalarias" data={MOCK_DATA} rules={RULES} chartHeight={220} />
          <ComparisonChart title="Población en pobreza" data={MOCK_DATA} rules={RULES} chartHeight={220} />
        </div>

        {/* ÍNDICE DE PRIORIDAD */}
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50">
          <h2 className="text-center text-[#4FD1C5] text-2xl font-black mb-10 uppercase tracking-[0.2em]">
            Índice de Prioridad
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <PriorityCard 
              title={loc1.nombre || "Selecciona ubicación"}
              subtitle={loc1.estado ? `(${loc1.estado})` : ""}
              priority="alta"
              progress={85}
              metrics={[
                { id: '1', label: "Hospitales por población", value: "4.0" },
                { id: '2', label: "Cobertura Médica", value: "0.7" },
                { id: '3', label: "Adultos Mayores", value: "14%" }
              ]}
            />

            <PriorityCard 
              title={loc2.nombre || "Selecciona ubicación"}
              subtitle={loc2.estado ? `(${loc2.estado})` : ""}
              priority="baja"
              progress={25}
              metrics={[
                { id: '1', label: "Hospitales por población", value: "8.4" },
                { id: '2', label: "Cobertura Médica", value: "2.9" },
                { id: '3', label: "Adultos Mayores", value: "27%" }
              ]}
            />
          </div>
        </div>
      </div>

      <Export 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        onExport={handleExportAction}
      />
    </AppLayout>
  );
}