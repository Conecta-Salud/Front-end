import React from "react";
import PriorityCard from "./PriorityCard";

const PrioritySection: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-green-500 font-semibold mb-6">Índice de Prioridad</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <PriorityCard
          state="alta"
          title="Cuernavaca"
          subtitle="(Morelos)"
          progress={90}
          metrics={[
            { label: "Hospitales por población", value: 4.0 },
            { label: "Cobertura Médica", value: 0.7 },
            { label: "Adultos Mayores", value: "14%" },
          ]}
        />

        <PriorityCard
          state="baja"
          title="Zapopan"
          subtitle="(Jalisco)"
          progress={30}
          metrics={[
            { label: "Hospitales por población", value: 8.4 },
            { label: "Cobertura Médica", value: 2.9 },
            { label: "Adultos Mayores", value: "27%" },
          ]}
        />
      </div>
    </div>
  );
};

export default PrioritySection;
