export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    currentUser: () => [...queryKeys.auth.all, "current-user"] as const,
  },

  healthMap: {
    all: ["health-map"] as const,
    statesGeoJson: () => [...queryKeys.healthMap.all, "states-geojson"] as const,
    municipalitiesGeoJson: (stateCode: string) =>
      [...queryKeys.healthMap.all, "municipalities-geojson", stateCode] as const,
    stateIndicators: (indicator: string, year: string) =>
      [...queryKeys.healthMap.all, "state-indicators", indicator, year] as const,
    municipalityIndicators: (
      stateCode: string,
      indicator: string,
      year: string
    ) =>
      [
        ...queryKeys.healthMap.all,
        "municipality-indicators",
        stateCode,
        indicator,
        year,
      ] as const,
  },
};