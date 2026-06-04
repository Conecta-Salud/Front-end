import { lazy, Suspense, useMemo, useState } from "react";

import type {
  HealthMapNavigationState,
} from "../features/health-map/types/healthMap.types";
import DashboardRankingSection from "../features/dashboard/components/DashboardRankingSection";

import { useHeaderFilterStore } from "../stores/headerFilterStore";
import { useDashboardScope } from "../features/dashboard/hooks/useDashboardScope";
import { useDashboardSummary } from "../features/dashboard/hooks/useDashboardSummary";
import DashboardKpiGrid from "../features/dashboard/components/DashboardKpiGrid";

import { formatLocationDisplayText } from "../features/locations/utils/locationDisplay.utils";
import type { LocationSearchResult } from "../features/locations/types/locationSearch.types";
import { useDataAvailabilityQuery } from "../features/data-availability/queries/dataAvailability.queries";
import {
  getCategoryAvailabilityNote,
  getCategoryCodeFromHeaderIndicator,
  isCategoryAvailable,
} from "../features/data-availability/utils/dataAvailability.utils";
import type { TerritoryLevel } from "../features/shared/types/apiContracts.types";

const HealthMap = lazy(() => import("../features/health-map/components/HealthMap"));
const DashboardChartSection = lazy(
  () => import("../features/dashboard/components/DashboardChartSection")
);

const categoryLabels = {
  medical_coverage: "Indicadores de cobertura médica",
  hospital_beds: "Indicadores de infraestructura hospitalaria",
  healthcare_access_deficiency: "Indicadores de vulnerabilidad poblacional",
};

function MapFallback() {
  return (
    <div className="flex min-h-[650px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
      <p className="text-[16px] text-gray-500">Cargando mapa...</p>
    </div>
  );
}

function ChartFallback() {
  return (
    <div className="h-[380px] rounded-[10px] bg-white shadow-sm animate-pulse" />
  );
}

function DataUnavailableNotice({ note }: { note: string }) {
  return (
    <section className="rounded-[10px] border border-[#F8D7A4] bg-[#FFF8EC] p-5 shadow-sm">
      <h2 className="text-[18px] font-semibold text-[#7A4A00]">
        Datos no disponibles
      </h2>

      <p className="mt-2 text-[15px] leading-6 text-[#7A4A00]">
        {note}
      </p>
    </section>
  );
}

function getEffectiveMapTerritoryLevel(level: TerritoryLevel): TerritoryLevel {
  if (level === "country") return "state";
  return "municipality";
}

function getNavigationFromSelectedLocation(
  selectedLocation: LocationSearchResult | null
): HealthMapNavigationState | null {
  if (!selectedLocation) return null;

  if (selectedLocation.type === "state") {
    return {
      level: "state",
      selectedState: {
        code: selectedLocation.code,
        name: selectedLocation.name,
      },
      selectedMunicipality: null,
    };
  }

  if (!selectedLocation.stateCode || !selectedLocation.stateName) {
    return null;
  }

  return {
    level: "municipality",
    selectedState: {
      code: selectedLocation.stateCode,
      name: selectedLocation.stateName,
    },
    selectedMunicipality: {
      code: selectedLocation.code,
      name: selectedLocation.name,
    },
  };
}

function DashboardStrategicPage() {
  const year = useHeaderFilterStore((state) => state.year);
  const indicator = useHeaderFilterStore((state) => state.category);

  const selectedLocation = useHeaderFilterStore((state) => state.selectedLocation);
  const setSelectedLocation = useHeaderFilterStore(
    (state) => state.setSelectedLocation
  );

  const [mapNavigation, setMapNavigation] = useState<HealthMapNavigationState>({
    level: "country",
    selectedState: null,
    selectedMunicipality: null,
  });

  const selectedLocationNavigation = useMemo(
    () => getNavigationFromSelectedLocation(selectedLocation),
    [selectedLocation]
  );

  const activeNavigation = selectedLocationNavigation ?? mapNavigation;

  const selectedYear = Number(year);
  const hasValidYear = Number.isFinite(selectedYear);
  const categoryCode = getCategoryCodeFromHeaderIndicator(indicator);

  const effectiveMapTerritoryLevel = useMemo(
    () => getEffectiveMapTerritoryLevel(activeNavigation.level),
    [activeNavigation.level]
  );

  const dashboardAvailabilityQuery = useDataAvailabilityQuery({
    territoryLevel: activeNavigation.level,
    analysisYear: selectedYear,
    categoryCode,
    enabled: hasValidYear,
  });

  const mapAvailabilityQuery = useDataAvailabilityQuery({
    territoryLevel: effectiveMapTerritoryLevel,
    analysisYear: selectedYear,
    categoryCode,
    enabled: hasValidYear,
  });

  const dashboardAvailabilityParams = {
    items: dashboardAvailabilityQuery.data?.items ?? [],
    territoryLevel: activeNavigation.level,
    analysisYear: selectedYear,
    headerIndicator: indicator,
  };

  const mapAvailabilityParams = {
    items: mapAvailabilityQuery.data?.items ?? [],
    territoryLevel: effectiveMapTerritoryLevel,
    analysisYear: selectedYear,
    headerIndicator: indicator,
  };

  const isDashboardCategoryAvailable =
    dashboardAvailabilityQuery.isSuccess &&
    isCategoryAvailable(dashboardAvailabilityParams);

  const shouldEnableDashboardSummary =
    dashboardAvailabilityQuery.isError ||
    (dashboardAvailabilityQuery.isSuccess && isDashboardCategoryAvailable);

  const isDashboardCategoryUnavailable =
    dashboardAvailabilityQuery.isSuccess && !isDashboardCategoryAvailable;

  const dashboardAvailabilityNote = getCategoryAvailabilityNote(
    dashboardAvailabilityParams
  );

  const isMapCategoryAvailable =
    mapAvailabilityQuery.isSuccess &&
    isCategoryAvailable(mapAvailabilityParams);

  const shouldEnableMapData =
    mapAvailabilityQuery.isError ||
    (mapAvailabilityQuery.isSuccess && isMapCategoryAvailable);

  const isMapCategoryUnavailable =
    mapAvailabilityQuery.isSuccess && !isMapCategoryAvailable;

  const mapAvailabilityNote = getCategoryAvailabilityNote(
    mapAvailabilityParams,
    "No hay datos disponibles para pintar el mapa con la categoría y año seleccionados."
  );

  const dashboardScope = useDashboardScope({
    navigation: activeNavigation,
    year,
  });

  const dashboardSummary = useDashboardSummary({
    scope: dashboardScope,
    category: indicator,
    enabled: shouldEnableDashboardSummary,
  });

  const isDashboardAvailabilityLoading = dashboardAvailabilityQuery.isLoading;
  const isMapAvailabilityLoading = mapAvailabilityQuery.isLoading;

  const handleMapNavigationChange = (navigation: HealthMapNavigationState) => {
    setSelectedLocation(null);
    setMapNavigation(navigation);
  };

  const goToCountry = () => {
    setSelectedLocation(null);

    setMapNavigation({
      level: "country",
      selectedState: null,
      selectedMunicipality: null,
    });
  };

  const goToState = () => {
    if (!activeNavigation.selectedState) return;

    setSelectedLocation(null);

    setMapNavigation({
      level: "state",
      selectedState: activeNavigation.selectedState,
      selectedMunicipality: null,
    });
  };

  return (
    <main className="min-h-full p-6">
      <section className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-black">
            <button
              type="button"
              onClick={goToCountry}
              disabled={activeNavigation.level === "country"}
              className={[
                "transition-opacity",
                activeNavigation.level === "country"
                  ? "cursor-default font-bold text-black"
                  : "cursor-pointer font-normal hover:opacity-70",
              ].join(" ")}
            >
              México
            </button>

            {activeNavigation.selectedState && (
              <>
                <span className="font-normal"> &gt; </span>

                <button
                  type="button"
                  onClick={goToState}
                  disabled={activeNavigation.level === "state"}
                  className={[
                    "transition-opacity",
                    activeNavigation.level === "state"
                      ? "cursor-default font-bold text-black"
                      : "cursor-pointer font-normal hover:opacity-70",
                  ].join(" ")}
                >
                  {formatLocationDisplayText(activeNavigation.selectedState.name)}
                </button>
              </>
            )}

            {activeNavigation.selectedMunicipality && (
              <>
                <span className="font-normal"> &gt; </span>

                <span className="font-bold text-black">
                  {formatLocationDisplayText(activeNavigation.selectedMunicipality.name)}
                </span>
              </>
            )}
          </h1>

          <p className="text-[16px] text-black">
            {categoryLabels[indicator]} | {year}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-12 items-stretch gap-6">
        <div className="col-span-12 min-h-0 xl:col-span-7 xl:h-full">
          <Suspense fallback={<MapFallback />}>
            <HealthMap
              indicator={indicator}
              year={year}
              navigation={activeNavigation}
              onNavigationChange={handleMapNavigationChange}
              isDataAvailable={shouldEnableMapData}
              isAvailabilityLoading={isMapAvailabilityLoading}
              availabilityMessage={
                isMapCategoryUnavailable ? mapAvailabilityNote : undefined
              }
            />
          </Suspense>
        </div>

        <aside className="col-span-12 flex min-h-0 flex-col gap-6 xl:col-span-5 xl:h-full">
          {isDashboardCategoryUnavailable ? (
            <DataUnavailableNotice note={dashboardAvailabilityNote} />
          ) : (
            <>
              <div className="shrink-0">
                <DashboardKpiGrid
                  kpis={dashboardSummary.summary?.kpis}
                  isLoading={
                    isDashboardAvailabilityLoading || dashboardSummary.isLoading
                  }
                  isError={dashboardSummary.isError}
                />
              </div>

              <DashboardRankingSection
                ranking={dashboardSummary.summary?.ranking}
                isLoading={
                  isDashboardAvailabilityLoading || dashboardSummary.isLoading
                }
                isError={dashboardSummary.isError}
                className="min-h-0 flex-1"
              />
            </>
          )}
        </aside>
      </section>

      {!isDashboardCategoryUnavailable && (
        <section className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-7">
            <Suspense fallback={<ChartFallback />}>
              <DashboardChartSection
                chart={dashboardSummary.summary?.mainChart}
                isLoading={
                  isDashboardAvailabilityLoading || dashboardSummary.isLoading
                }
                isError={dashboardSummary.isError}
                height={340}
              />
            </Suspense>
          </div>

          <div className="col-span-12 xl:col-span-5">
            <Suspense fallback={<ChartFallback />}>
              <DashboardChartSection
                chart={dashboardSummary.summary?.secondaryChart}
                isLoading={
                  isDashboardAvailabilityLoading || dashboardSummary.isLoading
                }
                isError={dashboardSummary.isError}
                height={340}
              />
            </Suspense>
          </div>
        </section>
      )}

      {dashboardSummary.isFetching && (
        <div className="fixed bottom-4 right-4 z-50 rounded-[10px] bg-white px-4 py-2 shadow-md">
          <p className="text-[14px] text-gray-500">Actualizando dashboard...</p>
        </div>
      )}
    </main>
  );
}

export default DashboardStrategicPage;
