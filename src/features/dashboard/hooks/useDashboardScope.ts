import { useMemo } from "react";
import type { HealthMapNavigationState } from "../../health-map/types/healthMap.types";
import {
  useMunicipalitiesCatalogQuery,
  usePeriodsCatalogQuery,
  useStatesCatalogQuery,
} from "../../catalogs/queries/catalog.queries";
import type { DashboardTerritoryLevel } from "../types/dashboard.types";

export type DashboardScope = {
  level: DashboardTerritoryLevel;
  stateId: number | null;
  municipalityId: number | null;
  periodId: number | null;
  isReady: boolean;
  isLoading: boolean;
};

type UseDashboardScopeParams = {
  navigation: HealthMapNavigationState;
  year: string;
};

export function useDashboardScope({
  navigation,
  year,
}: UseDashboardScopeParams): DashboardScope {
  const needsStateCatalog =
    navigation.level === "state" || navigation.level === "municipality";

  const needsMunicipalityCatalog = navigation.level === "municipality";
  const selectedStateCode = navigation.selectedState?.code ?? null;

  const statesQuery = useStatesCatalogQuery({
    enabled: needsStateCatalog,
  });

  const selectedState = useMemo(
    () => statesQuery.data?.find((item) => item.code === selectedStateCode),
    [selectedStateCode, statesQuery.data]
  );

  const stateId = selectedState?.id ?? null;

  const municipalitiesQuery = useMunicipalitiesCatalogQuery({
    stateId: stateId ?? undefined,
    enabled: needsMunicipalityCatalog && Boolean(stateId),
  });

  const periodsQuery = usePeriodsCatalogQuery();

  return useMemo(() => {
    const selectedYear = Number(year);

    const period = periodsQuery.data?.find(
      (item) => Number(item.year) === selectedYear
    );

    const periodId = period?.id ?? null;

    if (navigation.level === "country") {
      return {
        level: "country",
        stateId: null,
        municipalityId: null,
        periodId,
        isReady: Boolean(periodId),
        isLoading: periodsQuery.isLoading,
      };
    }

    if (navigation.level === "state") {
      return {
        level: "state",
        stateId,
        municipalityId: null,
        periodId,
        isReady: Boolean(stateId && periodId),
        isLoading: statesQuery.isLoading || periodsQuery.isLoading,
      };
    }

    const selectedMunicipalityCode =
      navigation.selectedMunicipality?.code ?? null;

    const selectedMunicipality = municipalitiesQuery.data?.find(
      (item) => item.code === selectedMunicipalityCode
    );

    const municipalityId = selectedMunicipality?.id ?? null;

    return {
      level: "municipality",
      stateId,
      municipalityId,
      periodId,
      isReady: Boolean(municipalityId && periodId),
      isLoading:
        statesQuery.isLoading ||
        municipalitiesQuery.isLoading ||
        periodsQuery.isLoading,
    };
  }, [
    navigation,
    year,
    statesQuery.isLoading,
    municipalitiesQuery.data,
    municipalitiesQuery.isLoading,
    periodsQuery.data,
    periodsQuery.isLoading,
    stateId,
  ]);
}
