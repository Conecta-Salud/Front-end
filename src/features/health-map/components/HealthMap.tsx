import { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {
  HealthMapFeatureCollection,
  HealthMapIndicator,
  HealthMapNavigationState,
  HealthMapIndicatorResponse,
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
import HealthMapLegend from "./HealthMapLegend";

type HealthMapProps = {
  indicator: HealthMapIndicator;
  year: string;
  navigation: HealthMapNavigationState;
  onNavigationChange: (navigation: HealthMapNavigationState) => void;
  isDataAvailable?: boolean;
  isAvailabilityLoading?: boolean;
  availabilityMessage?: string;
  className?: string;
};

export default function HealthMap({
  indicator,
  year,
  navigation,
  onNavigationChange,
  isDataAvailable = true,
  isAvailabilityLoading = false,
  availabilityMessage,
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
    enabled: isCountryView && isDataAvailable,
  });

  const municipalityIndicatorsQuery = useMunicipalityMapIndicatorsQuery({
    stateCode: selectedStateCode,
    indicator,
    year,
    enabled: isTerritoryView && isDataAvailable,
  });

  const activeGeoJson = useMemo<HealthMapFeatureCollection | undefined>(() => {
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
    if (!isDataAvailable) return [];
    if (isCountryView) return stateIndicatorsQuery.data;
    return municipalityIndicatorsQuery.data;
  }, [
    isDataAvailable,
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

  const geometryNavigationKey = [
    navigation.level,
    navigation.selectedState?.code ?? "country",
    navigation.selectedMunicipality?.code ?? "none",
  ].join("-");

  const currentNavigationKey = [
    geometryNavigationKey,
    indicator,
    year,
  ].join("-");

  const activeGeoJsonUpdatedAt = isCountryView
    ? statesGeoJsonQuery.dataUpdatedAt
    : municipalitiesGeoJsonQuery.dataUpdatedAt;

  const activeGeoJsonIsLoading = isCountryView
    ? statesGeoJsonQuery.isLoading
    : municipalitiesGeoJsonQuery.isLoading;

  const activeIndicatorsUpdatedAt = isCountryView
    ? stateIndicatorsQuery.dataUpdatedAt
    : municipalityIndicatorsQuery.dataUpdatedAt;

  const layerKey = [
    currentNavigationKey,
    activeGeoJsonUpdatedAt,
    activeIndicatorsUpdatedAt,
    navigation.selectedMunicipality?.code ?? "no-selection",
  ].join("-");

  const canFitBounds = Boolean(
    activeGeoJson && activeGeoJsonUpdatedAt && !activeGeoJsonIsLoading
  );

  const activeIndicatorsReady = !isDataAvailable || activeIndicatorsUpdatedAt > 0;

  const isInitialLoading = !activeGeoJson || !activeIndicatorsReady;

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
      <div className="flex min-h-[650px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-red-500">Could not load map data.</p>
      </div>
    );
  }

  if ((!activeGeoJson || !mergedData) && isInitialLoading) {
    return (
      <div className="flex min-h-[650px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-gray-500">Loading map...</p>
      </div>
    );
  }

  if (!activeGeoJson || !mergedData) {
    return (
      <div className="flex min-h-[650px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-gray-500">No map data available.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[650px] w-full flex-col overflow-hidden rounded-[10px] bg-white shadow-sm">
      <div
        className={[
          "relative min-h-[500px] flex-1 overflow-hidden rounded-t-[10px] rounded-b-none bg-white",
          className,
        ].join(" ")}
      >
        {isFetching && (
          <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/50">
            <p className="text-[16px] text-gray-500">Updating map...</p>
          </div>
        )}

        {isAvailabilityLoading && (
          <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/50">
            <p className="text-[16px] text-gray-500">
              Validando disponibilidad del mapa...
            </p>
          </div>
        )}

        {!isAvailabilityLoading && !isDataAvailable && availabilityMessage && (
          <div className="absolute left-4 top-4 z-[500] max-w-[360px] rounded-[10px] border border-[#F8D7A4] bg-[#FFF8EC] p-4 shadow-sm">
            <p className="text-[14px] font-medium text-[#7A4A00]">
              {availabilityMessage}
            </p>
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
            data={activeGeoJson}
            enabled={canFitBounds}
            navigationKey={geometryNavigationKey}
            viewLevel={navigation.level}
            maxZoom={STATE_MAX_FIT_ZOOM}
          />

          <HealthMapLayer
            data={mergedData}
            mapLevel={navigation.level}
            layerKey={layerKey}
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

      <HealthMapLegend
        indicator={indicator}
        indicators={activeIndicators}
        level={navigation.level}
      />
    </div>
  );
}
