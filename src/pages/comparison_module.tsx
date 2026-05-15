import { useMemo, useState } from "react";

import ComparisonSelector from "../features/comparison/components/ComparisonSelector";
import { useComparisonSummary } from "../features/comparison/hooks/useComparisonSummary";
import type { ComparisonLevel } from "../features/comparison/types/comparisonSummary.types";
import ComparisonChartGrid from "../features/comparison/components/ComparisonChartGrid";
import PriorityIndexCards from "../features/comparison/components/PriorityIndexCards";

import { useHeaderFilterStore } from "../stores/headerFilterStore";
import { usePeriodsCatalogQuery, useStatesCatalogQuery, useMunicipalitiesCatalogQuery } from "../features/catalogs/queries/catalog.queries";
import {
  adaptMunicipalitiesToLocationOptions,
  adaptStatesToLocationOptions,
} from "../features/comparison/utils/comparisonLocationOptions.adapter";
import type { LocationOption } from "../components/ui/LocationInput/LocationInput";

function ModuloComparacionPage() {
  const year = useHeaderFilterStore((state) => state.year);

  const [level, setLevel] = useState<ComparisonLevel>("state");
  const [firstLocation, setFirstLocation] = useState<LocationOption | null>(
    null
  );
  const [secondLocation, setSecondLocation] = useState<LocationOption | null>(
    null
  );

  const periodsQuery = usePeriodsCatalogQuery();
  const statesQuery = useStatesCatalogQuery({
    enabled: level === "state" || level === "municipality",
  });
  const municipalitiesQuery = useMunicipalitiesCatalogQuery({
    enabled: level === "municipality",
  });

  const periodId = useMemo(() => {
    const selectedYear = Number(year);

    return (
      periodsQuery.data?.find(
        (period) => Number(period.year) === selectedYear
      )?.id ?? null
    );
  }, [periodsQuery.data, year]);

  const locationOptions = useMemo(() => {
    if (level === "state") {
      return adaptStatesToLocationOptions(statesQuery.data);
    }

    return adaptMunicipalitiesToLocationOptions({
      municipalities: municipalitiesQuery.data,
      states: statesQuery.data,
    });
  }, [level, statesQuery.data, municipalitiesQuery.data]);

  const selectedCodes = useMemo(() => {
    if (!firstLocation?.code || !secondLocation?.code) return [];

    return [firstLocation.code, secondLocation.code];
  }, [firstLocation, secondLocation]);

  const selectionError =
    firstLocation?.code &&
    secondLocation?.code &&
    firstLocation.code === secondLocation.code
      ? "No puedes comparar el mismo territorio."
      : null;

  const comparisonSummary = useComparisonSummary({
    level,
    periodId,
    codes: selectedCodes,
    enabled: !selectionError,
  });

  const handleLevelChange = (nextLevel: ComparisonLevel) => {
    setLevel(nextLevel);
    setFirstLocation(null);
    setSecondLocation(null);
  };

  const isLoadingOptions =
    periodsQuery.isLoading ||
    statesQuery.isLoading ||
    (level === "municipality" && municipalitiesQuery.isLoading);

  return (
    <main className="min-h-full p-6">
      <section className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-black">
            Módulo de Comparación
          </h1>

          <p className="text-[16px] text-black">
            Elige dos estados o municipios del mismo nivel territorial para
            comparar | {year}
          </p>
        </div>
      </section>

      <ComparisonSelector
        level={level}
        firstLocation={firstLocation}
        secondLocation={secondLocation}
        options={locationOptions}
        isLoadingOptions={isLoadingOptions}
        error={selectionError}
        onLevelChange={handleLevelChange}
        onFirstLocationChange={setFirstLocation}
        onSecondLocationChange={setSecondLocation}
      />

      <section className="mt-6">
        {!periodId ? (
          <p className="text-[16px] text-gray-500">
            No se encontró periodo para el año seleccionado.
          </p>
        ) : selectedCodes.length !== 2 ? (
          <p className="text-[16px] text-gray-500">
            Selecciona dos territorios para iniciar la comparación.
          </p>
        ) : comparisonSummary.isLoading ? (
          <p className="text-[16px] text-gray-500">
            Cargando comparación...
          </p>
        ) : comparisonSummary.isError ? (
          <p className="text-[16px] text-red-500">
            No se pudo cargar la comparación.
          </p>
        ) : (
          <ComparisonChartGrid
            charts={comparisonSummary.charts}
            isLoading={comparisonSummary.isLoading}
            isError={comparisonSummary.isError}
          />
        )}

        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-[24px] font-semibold text-black">
              Índice de prioridad
            </h2>

            <p className="text-[16px] text-gray-500">
              Comparación del nivel de prioridad para atención gubernamental.
            </p>
          </div>

          <PriorityIndexCards
            priority={comparisonSummary.priority}
            isLoading={comparisonSummary.isLoading}
            isError={comparisonSummary.isError}
          />
        </section>
      </section>
    </main>
  );
}

export default ModuloComparacionPage;