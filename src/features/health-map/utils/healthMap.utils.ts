import type {
  HealthMapColorToken,
  HealthMapFeatureCollection,
  RawGeoJsonFeatureCollection,
} from "../types/healthMap.types";

export function getHealthMapFillColor(colorToken?: HealthMapColorToken) {
  switch (colorToken) {
    case "green":
      return "var(--color-green)";
    case "yellow":
      return "var(--color-yellow)";
    case "red":
      return "var(--color-red)";
    case "neutral":
    default:
      return "var(--color-text-secundary)";
  }
}

export function getHealthMapStrokeColor() {
  return "#FFFFFF";
}

export function createIndicatorLookup(
  indicators: unknown
) {
  const safeIndicators = Array.isArray(indicators) ? indicators : [];

  return new Map(safeIndicators.map((item) => [item.code, item]));
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
  geoJson: HealthMapFeatureCollection;
  indicators: unknown;
}): HealthMapFeatureCollection {
  const indicatorLookup = createIndicatorLookup(params.indicators);

  return {
    ...params.geoJson,
    features: params.geoJson.features.map((feature) => {
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
