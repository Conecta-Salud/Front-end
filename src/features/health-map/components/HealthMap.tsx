import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type {
  HealthMapFeatureCollection,
  HealthMapIndicator,
  HealthMapIndicatorResponse,
  HealthMapNavigationState,
  RawGeoJsonFeatureCollection,
} from "../types/healthMap.types";
import {
  fetchMunicipalitiesGeoJson,
  fetchMunicipalityMapIndicators,
  fetchStateMapIndicators,
  fetchStatesGeoJson,
} from "../services/healthMap.api";
import { mergeGeoJsonWithIndicators } from "../utils/healthMap.utils";
import HealthMapLayer from "./HealthMapLayer";
import HealthMapFitBounds from "./HealthMapFitBounds";
import HealthMapSelectedMarker from "./HealthMapSelectedMarker";
import { STATE_MAX_FIT_ZOOM, MEXICO_INITIAL_CENTER, MEXICO_INITIAL_ZOOM, } from "../constants/healthMap.constants";

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [geoJson, setGeoJson] = useState<RawGeoJsonFeatureCollection | null>(
    null
  );
  const [indicators, setIndicators] = useState<HealthMapIndicatorResponse[]>(
    []
  );

  const [loadedNavigationKey, setLoadedNavigationKey] = useState<string | null>(
  null
);

  const requestIdRef = useRef(0);

  const municipalityGeoJsonCache = useRef<
    Record<string, RawGeoJsonFeatureCollection>
  >({});

  const mergedData: HealthMapFeatureCollection | null = useMemo(() => {
    if (!geoJson) return null;

    return mergeGeoJsonWithIndicators({
      geoJson,
      indicators,
    });
  }, [geoJson, indicators]);

  const currentNavigationKey = [
    navigation.level,
    navigation.selectedState?.code ?? "country",
    navigation.selectedMunicipality?.code ?? "none",
    indicator,
    year,
  ].join("-");

  useEffect(() => {
    const currentRequestId = requestIdRef.current + 1;
    requestIdRef.current = currentRequestId;

    async function loadMapData() {
      try {
        setLoading(true);
        setError(null);

        if (navigation.level === "country") {
          const [statesGeoJson, stateIndicators] = await Promise.all([
            fetchStatesGeoJson(),
            fetchStateMapIndicators({
              indicator,
              year,
            }),
          ]);

          if (requestIdRef.current !== currentRequestId) return;

          setGeoJson(statesGeoJson);
          setIndicators(stateIndicators);
          setLoadedNavigationKey(currentNavigationKey);
          return;
        }

        if (
          (navigation.level === "state" || navigation.level === "municipality") &&
          navigation.selectedState
        ) {
          const stateCode = navigation.selectedState.code;

          let municipalitiesGeoJson = municipalityGeoJsonCache.current[stateCode];

          if (!municipalitiesGeoJson) {
            municipalitiesGeoJson = await fetchMunicipalitiesGeoJson(stateCode);
            municipalityGeoJsonCache.current[stateCode] = municipalitiesGeoJson;
          }

          const municipalityIndicators = await fetchMunicipalityMapIndicators({
            stateCode,
            indicator,
            year,
          });

          if (requestIdRef.current !== currentRequestId) return;

          setGeoJson(municipalitiesGeoJson);
          setIndicators(municipalityIndicators);
          setLoadedNavigationKey(currentNavigationKey);
        }

      } catch (err) {
        console.error(err);

        if (requestIdRef.current !== currentRequestId) return;

        setError("Could not load map data.");
      } finally {
        if (requestIdRef.current === currentRequestId) {
          setLoading(false);
        }
      }
    }

    setLoadedNavigationKey(null);
    loadMapData();
  }, [indicator, year, navigation]);

  if (error) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-red-500">{error}</p>
      </div>
    );
  }

  if (!mergedData && loading) {
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
      {loading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/60">
          <p className="text-[16px] text-gray-500">Loading map...</p>
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