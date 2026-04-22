import React from "react";
import PriorityCard from "./PriorityCard";

const PrioritySection = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-teal-500 font-semibold">Índice de Prioridad</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <PriorityCard
          variant="alta"
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
          variant="baja"
          title="Zapopan"
          subtitle="(Jalisco)"
          progress={30}
          metrics={[
            { label: "Hospitales por población", value: 8.4 },
            { label: "Cobertura Médica", value: 2.9 },
            { label: "Adultos Mayores", value: "27%" },
          ]}
        />

        {/* Ejemplo extra */}
      </div>
    </div>
  );
};

export default PrioritySection;
