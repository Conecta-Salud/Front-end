// src/features/health-map/components/HealthMap.tsx

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type {
  HealthMapFeatureCollection,
  HealthMapIndicator,
  RawGeoJsonFeatureCollection,
  HealthMapIndicatorResponse,
} from "../types/healthMap.types";
import {
  fetchStateMapIndicators,
  fetchStatesGeoJson,
} from "../services/healthMap.api";
import { mergeGeoJsonWithIndicators } from "../utils/healthMap.utils";
import HealthMapLayer from "./HealthMapLayer";

type HealthMapProps = {
  indicator: HealthMapIndicator;
  year: string;
  className?: string;
  onStateClick?: (stateCode: string, stateName: string) => void;
};

export default function HealthMap({
  indicator,
  year,
  className = "",
  onStateClick,
}: HealthMapProps) {
  const [geoJson, setGeoJson] = useState<RawGeoJsonFeatureCollection | null>(
    null
  );
  const [indicators, setIndicators] = useState<HealthMapIndicatorResponse[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mergedData: HealthMapFeatureCollection | null = useMemo(() => {
    if (!geoJson) return null;

    return mergeGeoJsonWithIndicators({
      geoJson,
      indicators,
    });
  }, [geoJson, indicators]);

  useEffect(() => {
    let isMounted = true;

    async function loadMapData() {
      try {
        setLoading(true);
        setError(null);

        const [statesGeoJson, stateIndicators] = await Promise.all([
          fetchStatesGeoJson(),
          fetchStateMapIndicators({
            indicator,
            year,
          }),
        ]);

        if (!isMounted) return;

        setGeoJson(statesGeoJson);
        setIndicators(stateIndicators);
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        setError("Could not load map data.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMapData();

    return () => {
      isMounted = false;
    };
  }, [indicator, year]);

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
        "h-[500px] w-full overflow-hidden rounded-[10px] bg-white shadow-sm",
        className,
      ].join(" ")}
    >
      <MapContainer
        center={[23.6345, -102.5528]}
        zoom={5}
        minZoom={4}
        maxZoom={8}
        scrollWheelZoom={false}
        zoomControl
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HealthMapLayer data={mergedData} onStateClick={onStateClick} />
      </MapContainer>
    </div>
  );
}