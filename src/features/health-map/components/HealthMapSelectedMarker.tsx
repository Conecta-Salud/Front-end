import L from "leaflet";
import { useMemo } from "react";
import { CircleMarker, Tooltip } from "react-leaflet";
import type {
  HealthMapFeature,
  HealthMapFeatureCollection,
} from "../types/healthMap.types";

type HealthMapSelectedMarkerProps = {
  data: HealthMapFeatureCollection;
  selectedCode?: string | null;
};

export default function HealthMapSelectedMarker({
  data,
  selectedCode,
}: HealthMapSelectedMarkerProps) {
  const selectedFeature = useMemo(
    () =>
      selectedCode
        ? (data.features.find(
            (feature) => feature.properties.code === selectedCode
          ) as HealthMapFeature | undefined)
        : undefined,
    [data, selectedCode]
  );

  const center = useMemo(() => {
    if (!selectedFeature) return null;

    const bounds = L.geoJSON(selectedFeature).getBounds();

    if (!bounds.isValid()) return null;

    return bounds.getCenter();
  }, [selectedFeature]);

  if (!selectedFeature || !center) return null;
  return (
    <CircleMarker
      center={center}
      radius={5}
      pathOptions={{
        color: "#111827",
        fillColor: "#FC6767",
        fillOpacity: 1,
        weight: 1,
      }}
    >
      <Tooltip direction="top" offset={[0, -8]} opacity={1}>
        <strong>{selectedFeature.properties.name}</strong>
      </Tooltip>
    </CircleMarker>
  );
}
