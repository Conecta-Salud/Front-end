import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type {
  HealthMapFeatureCollection,
  HealthMapIndicator,
  HealthMapIndicatorResponse,
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

type MapLevel = "country" | "state";

type HealthMapProps = {
  indicator: HealthMapIndicator;
  year: string;
  className?: string;
};

type MapNavigationState = {
  mapLevel: "country" | "state" | "municipality";
  selectedState?: {
    code: string;
    name: string;
  };
};

export default function HealthMap({
  indicator,
  year,
  className = "",
}: HealthMapProps) {
  const [mapLevel, setMapLevel] = useState<MapLevel>("country");
  const [selectedState, setSelectedState] = useState<{
    code: string;
    name: string;
  } | null>(null);

  const [geoJson, setGeoJson] = useState<RawGeoJsonFeatureCollection | null>(
    null
  );
  const [indicators, setIndicators] = useState<HealthMapIndicatorResponse[]>(
    []
  );

  const [municipalityGeoJsonCache, setMunicipalityGeoJsonCache] = useState<
    Record<string, RawGeoJsonFeatureCollection>
  >({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mergedData: HealthMapFeatureCollection | null = useMemo(() => {
    if (!geoJson) return null;

    return mergeGeoJsonWithIndicators({
      geoJson,
      indicators,
    });
  }, [geoJson, indicators]);

  const loadCountryMap = async () => {
    setLoading(true);
    setError(null);

    try {
      const [statesGeoJson, stateIndicators] = await Promise.all([
        fetchStatesGeoJson(),
        fetchStateMapIndicators({
          indicator,
          year,
        }),
      ]);

      setGeoJson(statesGeoJson);
      setIndicators(stateIndicators);
      setMapLevel("country");
      setSelectedState(null);
    } catch (err) {
      console.error(err);
      setError("Could not load national map data.");
    } finally {
      setLoading(false);
    }
  };

  const loadStateMap = async (stateCode: string, stateName: string) => {
    setLoading(true);
    setError(null);

    try {
      let municipalitiesGeoJson = municipalityGeoJsonCache[stateCode];

      if (!municipalitiesGeoJson) {
        municipalitiesGeoJson = await fetchMunicipalitiesGeoJson(stateCode);

        setMunicipalityGeoJsonCache((prev) => ({
          ...prev,
          [stateCode]: municipalitiesGeoJson,
        }));
      }

      const municipalityIndicators = await fetchMunicipalityMapIndicators({
        stateCode,
        indicator,
        year,
      });

      setGeoJson(municipalitiesGeoJson);
      setIndicators(municipalityIndicators);
      setMapLevel("state");
      setSelectedState({
        code: stateCode,
        name: stateName,
      });
    } catch (err) {
      console.error(err);
      setError(`Could not load municipalities for state ${stateCode}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mapLevel === "country") {
      loadCountryMap();
      return;
    }

    if (mapLevel === "state" && selectedState) {
      loadStateMap(selectedState.code, selectedState.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicator, year]);

  useEffect(() => {
    loadCountryMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-gray-500">Loading map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-[10px] bg-white shadow-sm">
        <p className="text-[16px] text-red-500">{error}</p>
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
      {mapLevel === "state" && selectedState && (
        <div className="absolute left-4 top-4 z-[1000] flex items-center gap-3 rounded-[10px] bg-white px-4 py-2 shadow-md">
          <button
            type="button"
            onClick={loadCountryMap}
            className="text-[14px] font-semibold"
            style={{
              backgroundImage: "var(--gradient-primary-green)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Back to Mexico
          </button>

          <span className="text-[14px] font-medium text-gray-500">
            {selectedState.name}
          </span>
        </div>
      )}

      <MapContainer
        center={[23.6345, -102.5528]}
        zoom={mapLevel === "country" ? 5 : 8}
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

        <HealthMapLayer
          data={mergedData}
          mapLevel={mapLevel}
          onStateClick={(stateCode, stateName) => {
            if (mapLevel !== "country") return;
            loadStateMap(stateCode, stateName);
          }}
        />
      </MapContainer>
    </div>
  );
}