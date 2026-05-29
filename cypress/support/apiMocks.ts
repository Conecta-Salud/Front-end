const states = [
  { id: 17, name: "Morelos", code: "17" },
  { id: 14, name: "Jalisco", code: "14" },
];

const municipalities = [
  { id: 17007, stateId: 17, name: "Cuernavaca", code: "17007" },
  { id: 14120, stateId: 14, name: "Zapopan", code: "14120" },
];

const stateGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[-102, 18], [-98, 18], [-98, 22], [-102, 22], [-102, 18]]],
      },
      properties: {
        code: "17",
        name: "Morelos",
      },
    },
  ],
};

const mapIndicators = [
  {
    code: "17",
    name: "Morelos",
    value: 2.5,
    level: "good",
    colorToken: "green",
  },
];

const dashboardSummary = {
  territory: {
    id: null,
    code: null,
    name: "México",
    type: "country",
  },
  period: {
    id: 1,
    periodYear: 2026,
  },
  category: "medical_coverage",
  kpis: [
    {
      id: "doctors_per_1000",
      label: "Médicos por 1000 habitantes",
      value: 2.5,
      unit: "doctors_per_1000",
      variant: "green",
      order: 1,
    },
    {
      id: "critical_states",
      label: "Estados críticos",
      value: 8,
      unit: "count",
      variant: "red",
      order: 2,
    },
  ],
  ranking: {
    title: "States with lowest medical coverage",
    columns: [
      { key: "name", label: "Nombre" },
      { key: "value", label: "Valor" },
    ],
    rows: [
      { id: "17", name: "Morelos", value: 2.5 },
      { id: "14", name: "Jalisco", value: 2.8 },
    ],
  },
  mainChart: {
    type: "bar",
    title: "States vs doctors per 1,000 inhabitants",
    data: [
      { label: "Morelos", value: 2.5, colorToken: "green" },
      { label: "Jalisco", value: 2.8, colorToken: "green" },
    ],
  },
  secondaryChart: {
    type: "pie",
    title: "Health units by care level",
    data: [
      { label: "Primary", value: 80, colorToken: "green" },
      { label: "Secondary", value: 20, colorToken: "yellow" },
    ],
  },
};

const comparisonSummary = {
  period: {
    id: 1,
    periodYear: 2026,
  },
  level: "state",
  territories: [
    { id: 17, code: "17", name: "Morelos", type: "state" },
    { id: 14, code: "14", name: "Jalisco", type: "state" },
  ],
  charts: [
    {
      id: "medical_coverage",
      title: "Medical coverage",
      type: "bar",
      referenceLine: {
        value: 2.7,
        label: "Minimum reference / 2.7",
      },
      data: [
        { territoryCode: "17", label: "Morelos", value: 2.5, variant: "yellow" },
        { territoryCode: "14", label: "Jalisco", value: 2.9, variant: "green" },
      ],
    },
  ],
  priority: [
    {
      territoryCode: "17",
      name: "Morelos",
      score: 76,
      level: "high",
      label: "High",
      colorToken: "red",
      factors: [
        {
          id: "medical_coverage",
          label: "Medical coverage",
          value: 2.5,
          unit: "doctors_per_1000",
          variant: "yellow",
        },
      ],
    },
  ],
};

const adminUsers = {
  items: [
    {
      id: "user-1",
      departmentId: 1,
      departmentName: "Dirección General",
      firstName: "Ana",
      lastName: "López",
      fullName: "Ana López",
      email: "ana@conectasalud.test",
      role: "strategic",
      active: true,
    },
  ],
};

export function mockCoreApi() {
  cy.intercept("GET", "**/periods", [{ id: 1, year: 2026 }]).as("periods");
  cy.intercept("GET", "**/states", states).as("states");
  cy.intercept("GET", "**/municipalities", municipalities).as("municipalities");
  cy.intercept("GET", "/geo/mexico-states.geojson", {
    headers: { "content-type": "application/geo+json" },
    body: stateGeoJson,
  }).as("statesGeoJson");
  cy.intercept("GET", "/geo/municipalities/*.geojson", {
    headers: { "content-type": "application/geo+json" },
    body: stateGeoJson,
  }).as("municipalitiesGeoJson");
  cy.intercept("GET", "**/api/v1/map/states*", mapIndicators).as("mapStates");
  cy.intercept("GET", "**/api/v1/map/municipalities*", mapIndicators).as(
    "mapMunicipalities"
  );
}

export function mockDashboardApi() {
  cy.intercept("GET", "**/dashboard/country/summary*", dashboardSummary).as(
    "dashboardSummary"
  );
  cy.intercept("GET", "**/dashboard/states/*/summary*", dashboardSummary).as(
    "dashboardStateSummary"
  );
}

export function mockComparisonApi() {
  cy.intercept("GET", "**/comparison/summary/states*", comparisonSummary).as(
    "comparisonSummary"
  );
  cy.intercept("GET", "**/comparison/summary/municipalities*", {
    ...comparisonSummary,
    level: "municipality",
  }).as("comparisonMunicipalitySummary");
}

export function mockAdminApi() {
  cy.intercept("GET", "**/users*", adminUsers).as("adminUsers");
  cy.intercept("DELETE", "**/users/user-1", {
    ...adminUsers.items[0],
    active: false,
  }).as("deactivateUser");
  cy.intercept("PUT", "**/users/reactivate/user-1", adminUsers.items[0]).as(
    "reactivateUser"
  );
}
