// src/features/health-map/components/HealthMapLayer.tsx

import { GeoJSON } from "react-leaflet";
import type { Layer, Path } from "leaflet";
import type { HealthMapFeatureCollection, HealthMapFeature } from "../types/healthMap.types";
import {
  getFeatureDisplayValue,
  getHealthMapFillColor,
  getHealthMapStrokeColor,
} from "../utils/healthMap.utils";

type HealthMapLayerProps = {
  data: HealthMapFeatureCollection;
  onStateClick?: (stateCode: string, stateName: string) => void;
};

const buildTooltipContent = (feature: HealthMapFeature) => {
  const { name, indicator } = feature.properties;

  if (!indicator) {
    return `
      <div style="min-width:160px">
        <strong>${name}</strong>
        <div style="font-size:12px;color:#6B7280;margin-top:4px">
          No data
        </div>
      </div>
    `;
  }

  return `
    <div style="min-width:160px">
      <strong>${name}</strong>
      <div style="font-size:12px;color:#6B7280;margin-top:4px">
        <div>Value: ${getFeatureDisplayValue(indicator.value)}</div>
        <div>Level: ${indicator.level}</div>
      </div>
    </div>
  `;
};

const isPathLayer = (layer: Layer): layer is Path => {
  return "setStyle" in layer;
};

export default function HealthMapLayer({
  data,
  onStateClick,
}: HealthMapLayerProps) {
  return (
    <GeoJSON
      key={data.features.map((feature) => feature.properties.code).join("-")}
      data={data}
      style={(feature) => {
        const typedFeature = feature as HealthMapFeature;
        const colorToken = typedFeature.properties.indicator?.colorToken;

        return {
          fillColor: getHealthMapFillColor(colorToken),
          color: getHealthMapStrokeColor(),
          weight: 1,
          fillOpacity: 0.85,
          opacity: 1,
        };
      }}
      onEachFeature={(feature, layer: Layer) => {
        const typedFeature = feature as HealthMapFeature;

        layer.bindTooltip(buildTooltipContent(typedFeature), {
          sticky: true,
          direction: "top",
          opacity: 1,
        });

        layer.on({
          mouseover: () => {
            if (!isPathLayer(layer)) return;

            layer.setStyle({
              weight: 2,
              fillOpacity: 1,
            });
          },
          mouseout: () => {
            if (!isPathLayer(layer)) return;

            layer.setStyle({
              weight: 1,
              fillOpacity: 0.85,
            });
          },
          click: () => {
            onStateClick?.(
              typedFeature.properties.code,
              typedFeature.properties.name
            );
          },
        });
      }}
    />
  );
}