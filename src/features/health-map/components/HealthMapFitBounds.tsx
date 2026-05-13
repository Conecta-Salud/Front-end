import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import type { HealthMapFeatureCollection } from "../types/healthMap.types";
import {
  MEXICO_INITIAL_CENTER,
  MEXICO_INITIAL_ZOOM,
} from "../constants/healthMap.constants";


type HealthMapFitBoundsProps = {
  data: HealthMapFeatureCollection;
  enabled: boolean;
  navigationKey: string;
  viewLevel: "country" | "state" | "municipality";
  maxZoom?: number;
};

export default function HealthMapFitBounds({
  data,
  enabled,
  navigationKey,
  viewLevel,
  maxZoom = 9,
}: HealthMapFitBoundsProps) {
  const map = useMap();
  
  useEffect(() => {
    if (!enabled) return;

    const timeoutId = window.setTimeout(() => {
      map.invalidateSize();

      if (viewLevel === "country") {
        map.setView(MEXICO_INITIAL_CENTER, MEXICO_INITIAL_ZOOM, {
          animate: true,
        });
        return;
      }

      if (!data.features.length) return;

      const bounds = L.geoJSON(data).getBounds();

      if (!bounds.isValid()) return;

      map.fitBounds(bounds, {
        padding: [30, 30],
        maxZoom,
        animate: true,
      });
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [data, enabled, navigationKey, viewLevel, map, maxZoom]);

  return null;
}