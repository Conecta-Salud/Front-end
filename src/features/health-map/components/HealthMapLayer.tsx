import { GeoJSON } from "react-leaflet";
import type { Layer, Path } from "leaflet";
import type {
  HealthMapFeature,
  HealthMapFeatureCollection,
  HealthMapViewLevel,
} from "../types/healthMap.types";
import {
  getFeatureDisplayValue,
  getHealthMapFillColor,
  getHealthMapStrokeColor,
} from "../utils/healthMap.utils";

type HealthMapLayerProps = {
  data: HealthMapFeatureCollection;
  mapLevel: HealthMapViewLevel;
  layerKey: string;
  selectedMunicipalityCode?: string | null;
  onStateClick?: (stateCode: string, stateName: string) => void;
  onMunicipalityClick?: (
    municipalityCode: string,
    municipalityName: string
  ) => void;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildTooltipContent = (feature: HealthMapFeature) => {
  const { name, indicator } = feature.properties;
  const safeName = escapeHtml(name);

  if (!indicator) {
    return `
      <div style="min-width:160px">
        <strong>${safeName}</strong>
        <div style="font-size:12px;color:#6B7280;margin-top:4px">
          No data
        </div>
      </div>
    `;
  }

  return `
    <div style="min-width:160px">
      <strong>${safeName}</strong>
      <div style="font-size:12px;color:#6B7280;margin-top:4px">
        <div>Value: ${getFeatureDisplayValue(indicator.value)}</div>
        <div>Level: ${escapeHtml(indicator.level)}</div>
      </div>
    </div>
  `;
};

const isPathLayer = (layer: Layer): layer is Path => {
  return "setStyle" in layer;
};

export default function HealthMapLayer({
  data,
  mapLevel,
  layerKey,
  selectedMunicipalityCode,
  onStateClick,
  onMunicipalityClick,
}: HealthMapLayerProps) {
  return (
    <GeoJSON
      key={layerKey}
      data={data}
      style={(feature) => {
        const typedFeature = feature as HealthMapFeature;
        const colorToken = typedFeature.properties.indicator?.colorToken;
        const isSelected =
          selectedMunicipalityCode === typedFeature.properties.code;

        return {
          fillColor: getHealthMapFillColor(colorToken),
          color: isSelected ? "#020617" : getHealthMapStrokeColor(),
          weight: isSelected ? 2 : 1,
          fillOpacity: isSelected ? 1 : 0.85,
          opacity: 1,
        };
      }}
      onEachFeature={(feature, layer) => {
        const typedFeature = feature as HealthMapFeature;

        layer.bindTooltip(buildTooltipContent(typedFeature), {
          sticky: true,
          direction: "top",
          opacity: 1,
        });

        layer.on({
          mouseover: () => {
            if (!isPathLayer(layer)) return;

            const isSelected =
              selectedMunicipalityCode === typedFeature.properties.code;

            layer.setStyle({
              weight: isSelected ? 2 : 2,
              fillOpacity: 1,
            });

            if (isSelected) {
              layer.bringToFront();
            }
          },

          mouseout: () => {
            if (!isPathLayer(layer)) return;

            const colorToken = typedFeature.properties.indicator?.colorToken;
            const isSelected =
              selectedMunicipalityCode === typedFeature.properties.code;

            layer.setStyle({
              fillColor: getHealthMapFillColor(colorToken),
              color: isSelected ? "#020617" : getHealthMapStrokeColor(),
              weight: isSelected ? 2 : 1,
              fillOpacity: isSelected ? 1 : 0.85,
              opacity: 1,
            });

            if (isSelected) {
              layer.bringToFront();
            }
          },

          click: () => {
            if (mapLevel === "country") {
              onStateClick?.(
                typedFeature.properties.code,
                typedFeature.properties.name
              );
              return;
            }

            if (mapLevel === "state" || mapLevel === "municipality") {
              onMunicipalityClick?.(
                typedFeature.properties.code,
                typedFeature.properties.name
              );
            }
          },
        });
      }}
    />
  );
}
