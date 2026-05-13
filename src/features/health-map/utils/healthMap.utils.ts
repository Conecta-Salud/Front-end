import type {
  HealthMapColorToken,
  HealthMapFeatureCollection,
  HealthMapIndicatorResponse,
  RawGeoJsonFeatureCollection,
} from "../types/healthMap.types";
//

export function getHealthMapFillColor(colorToken?: HealthMapColorToken) {
  switch (colorToken) {
    case "green":
      return "#14B8A6";
    case "yellow":
      return "#FACC15";
    case "red":
      return "#FC6767";
    case "neutral":
    default:
      return "#D1D5DB";
  }
}

export function getHealthMapStrokeColor() {
  return "#FFFFFF";
}

export function createIndicatorLookup(
  indicators: HealthMapIndicatorResponse[]
) {
  return new Map(indicators.map((item) => [item.code, item]));
}

export function normalizeGeoJson(
  geoJson: RawGeoJsonFeatureCollection
): HealthMapFeatureCollection {
  return {
    type: "FeatureCollection",
    features: geoJson.features.map((feature) => {
      const rawProperties = feature.properties ?? {};

      return {
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          code: String(rawProperties.code ?? rawProperties.CVEGEO ?? ""),
          name: String(rawProperties.name ?? rawProperties.NOMGEO ?? ""),
          stateCode:
            rawProperties.stateCode || rawProperties.CVE_ENT
              ? String(rawProperties.stateCode ?? rawProperties.CVE_ENT)
              : undefined,
          municipalityCode:
            rawProperties.municipalityCode || rawProperties.CVE_MUN
              ? String(rawProperties.municipalityCode ?? rawProperties.CVE_MUN)
              : undefined,
        },
      };
    }),
  };
}

export function mergeGeoJsonWithIndicators(params: {
  geoJson: RawGeoJsonFeatureCollection;
  indicators: HealthMapIndicatorResponse[];
}): HealthMapFeatureCollection {
  const normalizedGeoJson = normalizeGeoJson(params.geoJson);
  const indicatorLookup = createIndicatorLookup(params.indicators);

  return {
    ...normalizedGeoJson,
    features: normalizedGeoJson.features.map((feature) => {
      const indicator = indicatorLookup.get(feature.properties.code);

      return {
        ...feature,
        properties: {
          ...feature.properties,
          indicator,
        },
      };
    }),
  };
}

export function getFeatureDisplayValue(value: number | null | undefined) {
  if (value === null || value === undefined) return "No data";
  return value.toFixed(2);
}