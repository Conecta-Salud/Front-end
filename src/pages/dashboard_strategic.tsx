import { lazy, Suspense, useEffect, useState } from "react";

import type { HealthMapNavigationState } from "../features/health-map/types/healthMap.types";
import DashboardRankingSection from "../features/dashboard/components/DashboardRankingSection";

import { useHeaderFilterStore } from "../stores/headerFilterStore";
import { useDashboardScope } from "../features/dashboard/hooks/useDashboardScope";
import { useDashboardSummary } from "../features/dashboard/hooks/useDashboardSummary";
import DashboardKpiGrid from "../features/dashboard/components/DashboardKpiGrid";

import { formatLocationDisplayText } from "../features/locations/utils/locationDisplay.utils";
import { useDataAvailabilityQuery } from "../features/data-availability/queries/dataAvailability.queries";
import {
  getCategoryAvailabilityNote,
  getCategoryCodeFromHeaderIndicator,
  isCategoryAvailable,
} from "../features/data-availability/utils/dataAvailability.utils";

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

  useEffect(() => {
    if (!selectedLocation) return;

    if (selectedLocation.type === "state") {
      setMapNavigation({
        level: "state",
        selectedState: {
          code: selectedLocation.code,
          name: selectedLocation.name,
        },
        selectedMunicipality: null,
      });

      return;
    }

    if (selectedLocation.type === "municipality") {
      if (!selectedLocation.stateCode || !selectedLocation.stateName) {
        console.warn(
          "Municipality result is missing parent state data",
          selectedLocation
        );
        return;
      }

      setMapNavigation({
        level: "municipality",
        selectedState: {
          code: selectedLocation.stateCode,
          name: selectedLocation.stateName,
        },
        selectedMunicipality: {
          code: selectedLocation.code,
          name: selectedLocation.name,
        },
      });
    }
  }, [selectedLocation]);

  const dashboardScope = useDashboardScope({
    navigation: mapNavigation,
    year,
  });

  const selectedYear = Number(year);
  const categoryCode = getCategoryCodeFromHeaderIndicator(indicator);

  const dataAvailabilityQuery = useDataAvailabilityQuery({
    territoryLevel: mapNavigation.level,
    analysisYear: selectedYear,
    categoryCode,
    enabled: Number.isFinite(selectedYear),
  });

  const categoryAvailabilityParams = {
    items: dataAvailabilityQuery.data?.items,
    territoryLevel: mapNavigation.level,
    analysisYear: selectedYear,
    headerIndicator: indicator,
  };

  const isCurrentCategoryAvailable =
    dataAvailabilityQuery.isSuccess &&
    isCategoryAvailable(categoryAvailabilityParams);

  const isCurrentCategoryUnavailable =
    dataAvailabilityQuery.isSuccess && !isCurrentCategoryAvailable;

  const availabilityNote = getCategoryAvailabilityNote(
    categoryAvailabilityParams
  );

  const dashboardSummary = useDashboardSummary({
    scope: dashboardScope,
    category: indicator,
    enabled:
      dataAvailabilityQuery.isError ||
      (dataAvailabilityQuery.isSuccess && isCurrentCategoryAvailable),
  });

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
    if (!mapNavigation.selectedState) return;

    setSelectedLocation(null);

    setMapNavigation({
      level: "state",
      selectedState: mapNavigation.selectedState,
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
              disabled={mapNavigation.level === "country"}
              className={[
                "transition-opacity",
                mapNavigation.level === "country"
                  ? "cursor-default font-bold text-black"
                  : "cursor-pointer font-normal hover:opacity-70",
              ].join(" ")}
            >
              México
            </button>

            {mapNavigation.selectedState && (
              <>
                <span className="font-normal"> &gt; </span>

                <button
                  type="button"
                  onClick={goToState}
                  disabled={mapNavigation.level === "state"}
                  className={[
                    "transition-opacity",
                    mapNavigation.level === "state"
                      ? "cursor-default font-bold text-black"
                      : "cursor-pointer font-normal hover:opacity-70",
                  ].join(" ")}
                >
                  {formatLocationDisplayText(mapNavigation.selectedState.name)}
                </button>
              </>
            )}

            {mapNavigation.selectedMunicipality && (
              <>
                <span className="font-normal"> &gt; </span>

                <span className="font-bold text-black">
                  {formatLocationDisplayText(mapNavigation.selectedMunicipality.name)}
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
              navigation={mapNavigation}
              onNavigationChange={handleMapNavigationChange}
              isDataAvailable={!isCurrentCategoryUnavailable}
              availabilityMessage={availabilityNote}
            />
          </Suspense>
        </div>

        <aside className="col-span-12 flex min-h-0 flex-col gap-6 xl:col-span-5 xl:h-full">
          {isCurrentCategoryUnavailable ? (
            <DataUnavailableNotice note={availabilityNote} />
          ) : (
            <>
              <div className="shrink-0">
                <DashboardKpiGrid
                  kpis={dashboardSummary.summary?.kpis}
                  isLoading={
                    dataAvailabilityQuery.isLoading || dashboardSummary.isLoading
                  }
                  isError={dashboardSummary.isError}
                />
              </div>

              <DashboardRankingSection
                ranking={dashboardSummary.summary?.ranking}
                isLoading={
                  dataAvailabilityQuery.isLoading || dashboardSummary.isLoading
                }
                isError={dashboardSummary.isError}
                className="min-h-0 flex-1"
              />
            </>
          )}
        </aside>
      </section>

      {!isCurrentCategoryUnavailable && (
        <section className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-7">
            <Suspense fallback={<ChartFallback />}>
              <DashboardChartSection
                chart={dashboardSummary.summary?.mainChart}
                isLoading={
                  dataAvailabilityQuery.isLoading || dashboardSummary.isLoading
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
                  dataAvailabilityQuery.isLoading || dashboardSummary.isLoading
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
