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
    enabled: Boolean(periodId) && selectedCodes.length === 2 && !selectionError,
  });

  const hasCompleteSelection =
    Boolean(periodId) &&
    selectedCodes.length === 2 &&
    !selectionError;

  const safeCharts = hasCompleteSelection ? comparisonSummary.charts : [];
  const safePriority = hasCompleteSelection ? comparisonSummary.priority : [];

  const shouldShowComparisonResult =
    hasCompleteSelection &&
    !comparisonSummary.isLoading &&
    !comparisonSummary.isError;

  const shouldShowEmptyState = !periodId || !hasCompleteSelection;

  const shouldShowLoadingState =
    hasCompleteSelection && comparisonSummary.isLoading;

  const shouldShowErrorState =
    hasCompleteSelection && comparisonSummary.isError;


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

      {shouldShowEmptyState && (
        <section className="mt-6 rounded-[10px] bg-white p-6 shadow-sm">
          <h2
            className="mb-2 text-[20px] font-semibold"
            style={{
              backgroundImage: "var(--gradient-primary-green)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Comparación pendiente
          </h2>

          <p className="text-[16px] text-gray-500">
            {!periodId
              ? "No se encontró periodo para el año seleccionado."
              : "Selecciona dos territorios del mismo nivel para visualizar gráficas e índice de prioridad."}
          </p>
        </section>
      )}

      {shouldShowLoadingState && (
        <>
          <section className="mt-6">
            <ComparisonChartGrid
              charts={[]}
              isLoading
              isError={false}
            />
          </section>

          <section className="mt-6 rounded-[10px] bg-white p-6 shadow-sm">
            <h2
              className="mb-2 text-[20px] font-semibold"
              style={{
                backgroundImage: "var(--gradient-primary-green)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Índice de prioridad
            </h2>

            <p className="mb-5 text-[16px] text-gray-500">
              Comparación del nivel de prioridad para atención gubernamental.
            </p>

            <PriorityIndexCards
              priority={[]}
              isLoading
              isError={false}
            />
          </section>
        </>
      )}

      {shouldShowErrorState && (
        <section className="mt-6 rounded-[10px] bg-white p-6 shadow-sm">
          <h2
            className="mb-2 text-[20px] font-semibold"
            style={{
              backgroundImage: "var(--gradient-primary-green)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            No se pudo cargar la comparación
          </h2>

          <p className="text-[16px] text-red-500">
            Intenta cambiar los territorios seleccionados o verifica que existan datos para el año seleccionado.
          </p>
        </section>
      )}

      {shouldShowComparisonResult && (
        <>
          <section className="mt-6">
            <ComparisonChartGrid
              charts={safeCharts}
              isLoading={false}
              isError={false}
            />
          </section>

          <section className="mt-6 rounded-[10px] bg-white p-6 shadow-sm">
            <h2
              className="mb-2 text-[20px] font-semibold"
              style={{
                backgroundImage: "var(--gradient-primary-green)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Índice de prioridad
            </h2>

            <p className="mb-5 text-[16px] text-gray-500">
              Comparación del nivel de prioridad para atención gubernamental.
            </p>

            <PriorityIndexCards
              priority={safePriority}
              isLoading={false}
              isError={false}
            />
          </section>
        </>
      )}
    </main>
  );
}

export default ModuloComparacionPage;