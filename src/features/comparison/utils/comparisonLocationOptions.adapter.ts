import type {
  MunicipalityCatalogItem,
  StateCatalogItem,
} from "../../catalogs/types/catalog.types";
import type { LocationOption } from "../../../components/ui/LocationInput/LocationInput";

export function adaptStatesToLocationOptions(
  states: StateCatalogItem[] = []
): LocationOption[] {
  return states
    .filter((state) => Boolean(state.code))
    .map((state) => ({
      id: String(state.id),
      code: state.code,
      name: state.name,
      level: "state",
      stateCode: state.code,
    }));
}

export function adaptMunicipalitiesToLocationOptions(params: {
  municipalities?: MunicipalityCatalogItem[];
  states?: StateCatalogItem[];
}): LocationOption[] {
  const statesById = new Map(
    (params.states ?? []).map((state) => [state.id, state])
  );

  return (params.municipalities ?? [])
    .filter((municipality) => Boolean(municipality.code))
    .map((municipality) => {
      const parentState = statesById.get(municipality.stateId);

      return {
        id: String(municipality.id),
        code: municipality.code,
        name: municipality.name,
        level: "municipality",
        stateCode: parentState?.code ?? municipality.stateCode,
        stateName: parentState?.name,
      };
    });
}