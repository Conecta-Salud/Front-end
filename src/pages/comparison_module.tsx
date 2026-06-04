import { lazy, Suspense, useMemo, useState } from "react";

import ComparisonSelector from "../features/comparison/components/ComparisonSelector";
import { useComparisonSummary } from "../features/comparison/hooks/useComparisonSummary";
import type { ComparisonLevel } from "../features/comparison/types/comparisonSummary.types";
import { hasUnavailableComparisonCharts } from "../features/comparison/utils/comparisonChart.adapter";

import { usePeriodsCatalogQuery } from "../features/catalogs/queries/catalog.queries";
import { useHeaderFilterStore } from "../stores/headerFilterStore";

import type { LocationOption } from "../components/ui/LocationInput/LocationInput";

const ComparisonChartGrid = lazy(
  () => import("../features/comparison/components/ComparisonChartGrid")
);
const PriorityIndexCards = lazy(
  () => import("../features/comparison/components/PriorityIndexCards")
);

function ComparisonChartsFallback() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-[260px] rounded-[10px] bg-white shadow-sm animate-pulse"
        />
      ))}
    </section>
  );
}

function PriorityFallback() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="h-[280px] rounded-[10px] bg-white shadow-sm animate-pulse"
        />
      ))}
    </section>
  );
}

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
  const selectedYear = Number(year);

  const periodId = useMemo(() => {
    if (!Number.isFinite(selectedYear)) {
      return null;
    }

    return (
      periodsQuery.data?.find(
        (period) => Number(period.year) === selectedYear
      )?.id ?? null
    );
  }, [periodsQuery.data, selectedYear]);

  const firstCode = firstLocation?.code ?? null;
  const secondCode = secondLocation?.code ?? null;
  const hasFirstLocation = Boolean(firstCode);
  const hasSecondLocation = Boolean(secondCode);
  const hasAnyLocation = hasFirstLocation || hasSecondLocation;
  const hasBothLocations = hasFirstLocation && hasSecondLocation;
  const hasDuplicateTerritories =
    Boolean(firstCode) && Boolean(secondCode) && firstCode === secondCode;
  const hasValidLevel = level === "state" || level === "municipality";

  const selectedCodes = useMemo(() => {
    if (!firstCode || !secondCode) return [];

    return [firstCode, secondCode];
  }, [firstCode, secondCode]);

  const selectionError = hasDuplicateTerritories
    ? "Selecciona dos territorios diferentes."
    : null;

  const isPeriodLoading =
    periodsQuery.isLoading || (periodsQuery.isFetching && !periodsQuery.data);

  const canFetchComparison =
    Boolean(periodId) &&
    hasBothLocations &&
    !hasDuplicateTerritories &&
    hasValidLevel;

  const comparisonSummary = useComparisonSummary({
    level,
    periodId,
    codes: selectedCodes,
    enabled: canFetchComparison,
  });

  const safeCharts = canFetchComparison ? comparisonSummary.charts : [];
  const safePriority = canFetchComparison ? comparisonSummary.priority : [];

  const shouldShowLoadingState =
    canFetchComparison && comparisonSummary.isLoading;

  const shouldShowErrorState = canFetchComparison && comparisonSummary.isError;

  const shouldShowComparisonResult =
    canFetchComparison &&
    !comparisonSummary.isLoading &&
    !comparisonSummary.isError;

  const emptyStateMessage = useMemo(() => {
    if (selectionError) {
      return selectionError;
    }

    if (!hasAnyLocation) {
      return "Selecciona dos territorios para iniciar la comparación.";
    }

    if (!hasBothLocations) {
      return "Selecciona un segundo territorio para comparar.";
    }

    if (isPeriodLoading) {
      return "Cargando periodo disponible para el año seleccionado.";
    }

    if (!periodId) {
      return "No hay periodo disponible para el año seleccionado.";
    }

    return null;
  }, [
    hasAnyLocation,
    hasBothLocations,
    isPeriodLoading,
    periodId,
    selectionError,
  ]);

  const shouldShowEmptyState =
    Boolean(emptyStateMessage) &&
    !shouldShowLoadingState &&
    !shouldShowErrorState;

  const shouldShowPartialDataMessage =
    shouldShowComparisonResult &&
    safeCharts.length > 0 &&
    hasUnavailableComparisonCharts(safeCharts);

  const comparisonUnavailableMessage =
    "No hay datos disponibles o suficientes para construir esta comparación con el año y territorios seleccionados.";

  const handleLevelChange = (nextLevel: ComparisonLevel) => {
    setLevel(nextLevel);
    setFirstLocation(null);
    setSecondLocation(null);
  };

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

          <p
            className="text-[16px]"
            style={{
              color: "var(--color-text-secundary)",
            }}
          >
            {emptyStateMessage}
          </p>
        </section>
      )}

      {shouldShowLoadingState && (
        <>
          <section className="mt-6">
            <Suspense fallback={<ComparisonChartsFallback />}>
              <ComparisonChartGrid charts={[]} isLoading isError={false} />
            </Suspense>
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

            <Suspense fallback={<PriorityFallback />}>
              <PriorityIndexCards priority={[]} isLoading isError={false} />
            </Suspense>
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
            No se pudo cargar la comparación. Intenta nuevamente.
          </p>
        </section>
      )}

      {shouldShowComparisonResult && (
        <>
          {shouldShowPartialDataMessage && (
            <section className="mt-6 rounded-[10px] bg-white p-4 shadow-sm">
              <p className="text-[15px] text-gray-500">
                Algunos indicadores no están disponibles para el nivel
                territorial seleccionado.
              </p>
            </section>
          )}

          <section className="mt-6">
            <Suspense fallback={<ComparisonChartsFallback />}>
              <ComparisonChartGrid
                charts={safeCharts}
                isLoading={false}
                isError={false}
                emptyMessage={comparisonUnavailableMessage}
              />
            </Suspense>
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

            <Suspense fallback={<PriorityFallback />}>
              <PriorityIndexCards
                priority={safePriority}
                isLoading={false}
                isError={false}
                emptyMessage="No hay índice de prioridad disponible para esta comparación."
              />
            </Suspense>
          </section>
        </>
      )}
    </main>
  );
}

export default ModuloComparacionPage;
