import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type {
  HealthMapFeatureCollection,
  HealthMapIndicator,
  HealthMapNavigationState,
  HealthMapIndicatorResponse,
  RawGeoJsonFeatureCollection,
} from "../types/healthMap.types";
import {
  useMunicipalitiesGeoJsonQuery,
  useMunicipalityMapIndicatorsQuery,
  useStateMapIndicatorsQuery,
  useStatesGeoJsonQuery,
} from "../queries/healthMap.queries";
import { mergeGeoJsonWithIndicators } from "../utils/healthMap.utils";
import {
  MEXICO_INITIAL_CENTER,
  MEXICO_INITIAL_ZOOM,
  STATE_MAX_FIT_ZOOM,
} from "../constants/healthMap.constants";
import HealthMapLayer from "./HealthMapLayer";
import HealthMapFitBounds from "./HealthMapFitBounds";
import HealthMapSelectedMarker from "./HealthMapSelectedMarker";

type HealthMapProps = {
  indicator: HealthMapIndicator;
  year: string;
  navigation: HealthMapNavigationState;
  onNavigationChange: (navigation: HealthMapNavigationState) => void;
  className?: string;
};

export default function HealthMap({
  indicator,
  year,
  navigation,
  onNavigationChange,
  className = "",
}: HealthMapProps) {
  const selectedStateCode = navigation.selectedState?.code ?? null;

  const isCountryView = navigation.level === "country";
  const isTerritoryView =
    navigation.level === "state" || navigation.level === "municipality";

  const statesGeoJsonQuery = useStatesGeoJsonQuery();

  const municipalitiesGeoJsonQuery =
    useMunicipalitiesGeoJsonQuery(selectedStateCode);

  const stateIndicatorsQuery = useStateMapIndicatorsQuery({
    indicator,
    year,
    enabled: isCountryView,
  });

  const municipalityIndicatorsQuery = useMunicipalityMapIndicatorsQuery({
    stateCode: selectedStateCode,
    indicator,
    year,
    enabled: isTerritoryView,
  });

  const activeGeoJson = useMemo<RawGeoJsonFeatureCollection | undefined>(() => {
    if (isCountryView) return statesGeoJsonQuery.data;
    return municipalitiesGeoJsonQuery.data;
  }, [
    isCountryView,
    statesGeoJsonQuery.data,
    municipalitiesGeoJsonQuery.data,
  ]);

  const activeIndicators = useMemo<
    HealthMapIndicatorResponse[] | undefined
  >(() => {
    if (isCountryView) return stateIndicatorsQuery.data;
    return municipalityIndicatorsQuery.data;
  }, [
    isCountryView,
    stateIndicatorsQuery.data,
    municipalityIndicatorsQuery.data,
  ]);

  const mergedData: HealthMapFeatureCollection | null = useMemo(() => {
    if (!activeGeoJson) return null;

    return mergeGeoJsonWithIndicators({
      geoJson: activeGeoJson,
      indicators: activeIndicators ?? [],
    });
  }, [activeGeoJson, activeIndicators]);

  const currentNavigationKey = [
    navigation.level,
    navigation.selectedState?.code ?? "country",
    navigation.selectedMunicipality?.code ?? "none",
    indicator,
    year,
  ].join("-");

  const [loadedNavigationKey, setLoadedNavigationKey] = useState<string | null>(
    null
  );

  const activeGeoJsonUpdatedAt = isCountryView
    ? statesGeoJsonQuery.dataUpdatedAt
    : municipalitiesGeoJsonQuery.dataUpdatedAt;

  const activeIndicatorsUpdatedAt = isCountryView
    ? stateIndicatorsQuery.dataUpdatedAt
    : municipalityIndicatorsQuery.dataUpdatedAt;

  const activeIsLoading = isCountryView
    ? statesGeoJsonQuery.isLoading || stateIndicatorsQuery.isLoading
    : municipalitiesGeoJsonQuery.isLoading ||
      municipalityIndicatorsQuery.isLoading;

  useEffect(() => {
    setLoadedNavigationKey(null);
  }, [currentNavigationKey]);

  useEffect(() => {
    if (!mergedData) return;
    if (!activeGeoJsonUpdatedAt) return;
    if (activeIsLoading) return;

    setLoadedNavigationKey(currentNavigationKey);
  }, [
    mergedData,
    activeGeoJsonUpdatedAt,
    activeIndicatorsUpdatedAt,
    activeIsLoading,
    currentNavigationKey,
  ]);

  const isInitialLoading =
    isCountryView
      ? statesGeoJsonQuery.isLoading || stateIndicatorsQuery.isLoading
      : municipalitiesGeoJsonQuery.isLoading ||
        municipalityIndicatorsQuery.isLoading;

  const isFetching =
    statesGeoJsonQuery.isFetching ||
    municipalitiesGeoJsonQuery.isFetching ||
    stateIndicatorsQuery.isFetching ||
    municipalityIndicatorsQuery.isFetching;

  const error =
    statesGeoJsonQuery.error ||
    municipalitiesGeoJsonQuery.error ||
    stateIndicatorsQuery.error ||
    municipalityIndicatorsQuery.error;

  if (error) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-red-500">Could not load map data.</p>
      </div>
    );
  }

  if (!mergedData && isInitialLoading) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-gray-500">Loading map...</p>
      </div>
    );
  }

  if (!mergedData) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-gray-500">No map data available.</p>
      </div>
    );
  }

  return (
    <div
      className={[
        "relative h-[500px] w-full overflow-hidden rounded-[10px] bg-white shadow-sm",
        className,
      ].join(" ")}
    >
      {isFetching && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/50">
          <p className="text-[16px] text-gray-500">Updating map...</p>
        </div>
      )}

      <MapContainer
        center={MEXICO_INITIAL_CENTER}
        zoom={MEXICO_INITIAL_ZOOM}
        minZoom={4}
        maxZoom={10}
        scrollWheelZoom={false}
        zoomControl
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HealthMapFitBounds
          data={mergedData}
          enabled={loadedNavigationKey === currentNavigationKey}
          navigationKey={currentNavigationKey}
          viewLevel={navigation.level}
          maxZoom={STATE_MAX_FIT_ZOOM}
        />

        <HealthMapLayer
          data={mergedData}
          mapLevel={navigation.level}
          selectedMunicipalityCode={navigation.selectedMunicipality?.code}
          onStateClick={(stateCode, stateName) => {
            if (navigation.level !== "country") return;

            onNavigationChange({
              level: "state",
              selectedState: {
                code: stateCode,
                name: stateName,
              },
              selectedMunicipality: null,
            });
          }}
          onMunicipalityClick={(municipalityCode, municipalityName) => {
            if (!navigation.selectedState) return;

            onNavigationChange({
              level: "municipality",
              selectedState: navigation.selectedState,
              selectedMunicipality: {
                code: municipalityCode,
                name: municipalityName,
              },
            });
          }}
        />

        <HealthMapSelectedMarker
          data={mergedData}
          selectedCode={navigation.selectedMunicipality?.code}
        />
      </MapContainer>
    </div>
  );
}