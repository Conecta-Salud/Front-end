export const coberturaData = [
  { label: "Cuernavaca", subtitle: "(Morelos)", value: 0.6 },
  { label: "Zapopan", subtitle: "(Jalisco)", value: 2.9 },
  { label: "Zapopan", subtitle: "(Jalisco)", value: 2.1 },
];

export const coberturaRules = [
  { min: 2.3, tone: "green" as const },
  { min: 1, max: 2.29, tone: "yellow" as const },
  { max: 0.99, tone: "red" as const },
];

export const deficitRules = [
  { max: 0.99, tone: "green" as const },
  { min: 1, max: 2.29, tone: "yellow" as const },
  { min: 2.3, tone: "red" as const },
];
