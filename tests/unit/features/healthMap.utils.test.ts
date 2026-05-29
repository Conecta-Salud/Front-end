import {
  createIndicatorLookup,
  getFeatureDisplayValue,
  getHealthMapFillColor,
  mergeGeoJsonWithIndicators,
  normalizeGeoJson,
} from "../../../src/features/health-map/utils/healthMap.utils";
import type {
  HealthMapFeatureCollection,
  RawGeoJsonFeatureCollection,
} from "../../../src/features/health-map/types/healthMap.types";

describe("healthMap.utils", () => {
  it("maps health color tokens to design tokens", () => {
    expect(getHealthMapFillColor("green")).toBe("var(--color-green)");
    expect(getHealthMapFillColor("yellow")).toBe("var(--color-yellow)");
    expect(getHealthMapFillColor("red")).toBe("var(--color-red)");
    expect(getHealthMapFillColor("neutral")).toBe(
      "var(--color-text-secundary)"
    );
  });

  it("creates an indicator lookup only from array input", () => {
    const lookup = createIndicatorLookup([
      {
        code: "01",
        name: "Aguascalientes",
        value: 2.6,
        level: "good",
        colorToken: "green",
      },
    ]);

    expect(lookup.get("01")?.value).toBe(2.6);
    expect(createIndicatorLookup(null).size).toBe(0);
  });

  it("normalizes raw GeoJSON properties into the map contract", () => {
    const rawGeoJson: RawGeoJsonFeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            CVEGEO: "17007",
            NOMGEO: "Cuernavaca",
            CVE_ENT: "17",
            CVE_MUN: "007",
          },
        },
      ],
    };

    expect(normalizeGeoJson(rawGeoJson).features[0].properties).toEqual({
      code: "17007",
      name: "Cuernavaca",
      stateCode: "17",
      municipalityCode: "007",
    });
  });

  it("merges indicators without mutating normalized geometry", () => {
    const geoJson: HealthMapFeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {
            code: "17",
            name: "Morelos",
          },
        },
      ],
    };

    const merged = mergeGeoJsonWithIndicators({
      geoJson,
      indicators: [
        {
          code: "17",
          name: "Morelos",
          value: 1.8,
          level: "risk",
          colorToken: "yellow",
        },
      ],
    });

    expect(merged.features[0].properties.indicator?.value).toBe(1.8);
    expect(geoJson.features[0].properties.indicator).toBeUndefined();
  });

  it("formats nullable feature values", () => {
    expect(getFeatureDisplayValue(2.345)).toBe("2.35");
    expect(getFeatureDisplayValue(null)).toBe("No data");
  });
});
