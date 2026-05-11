export type LocationLevel = "state" | "municipality";

export type LocationOption = {
  id: string;
  name: string;
  level: LocationLevel;
  stateName?: string;
  stateCode?: string;
};

export const locationOptionsMock: LocationOption[] = [
  {
    id: 'state-jalisco',
    name: 'Jalisco',
    level: 'state',
    stateCode: 'JAL',
  },
  {
    id: 'state-cdmx',
    name: 'Ciudad de México',
    level: 'state',
    stateCode: 'CDMX',
  },
  {
    id: 'municipality-guadalajara',
    name: 'Guadalajara',
    level: 'municipality',
    stateName: 'Jalisco',
    stateCode: 'JAL',
  },
  {
    id: 'municipality-zapopan',
    name: 'Zapopan',
    level: 'municipality',
    stateName: 'Jalisco',
    stateCode: 'JAL',
  },
  {
    id: 'municipality-coyoacan',
    name: 'Coyoacán',
    level: 'municipality',
    stateName: 'Ciudad de México',
    stateCode: 'CDMX',
  },
];