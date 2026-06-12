import type { Meta, StoryObj } from "@storybook/react-vite";

import ComparisonChart from "./ComparisonChart";

const coberturaData = [
  { label: "Cuernavaca", subtitle: "(Morelos)", value: 0.7 },
  { label: "Zapopan", subtitle: "(Jalisco)", value: 2.9 },
];

const deficitData = [
  { label: "Cuernavaca", subtitle: "(Morelos)", value: 2.6 },
  { label: "Zapopan", subtitle: "(Jalisco)", value: 0.8 },
];

const camasData = [
  { label: "Morelia", subtitle: "(Michoacán)", value: 1.4 },
  { label: "Monterrey", subtitle: "(Nuevo León)", value: 2.5 },
  { label: "Puebla", subtitle: "(Puebla)", value: 0.9 },
];

const pobrezaData = [
  { label: "Chiapas", subtitle: "(Chiapas)", value: 67.4 },
  { label: "Querétaro", subtitle: "(Querétaro)", value: 26.2 },
  { label: "Nuevo León", subtitle: "(Nuevo León)", value: 24.3 },
];

const coberturaRules = [
  { min: 2.3, tone: "green" as const },
  { min: 1, max: 2.29, tone: "yellow" as const },
  { max: 0.99, tone: "red" as const },
];

const invertedRules = [
  { max: 0.99, tone: "green" as const },
  { min: 1, max: 2.29, tone: "yellow" as const },
  { min: 2.3, tone: "red" as const },
];

const pobrezaRules = [
  { max: 29.9, tone: "green" as const },
  { min: 30, max: 49.9, tone: "yellow" as const },
  { min: 50, tone: "red" as const },
];

const meta = {
  title: "Components/Charts/ComparisonChart",
  component: ComparisonChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    chartHeight: {
      control: { type: "number", min: 220, max: 700, step: 20 },
    },
    yDomain: { control: "object" },
    emptyMessage: { control: "text" },
    referenceLine: { control: "object" },
    rules: { control: "object" },
  },
  args: {
    title: "Cobertura médica",
    data: coberturaData,
    rules: coberturaRules,
    yDomain: [0, 3.5],
    chartHeight: 320,
  },
} satisfies Meta<typeof ComparisonChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CoberturaMedica: Story = {
  args: {
    referenceLine: {
      value: 2.3,
      label: "Referencia mínima OMS / 2.3",
    },
  },
  render: (args) => (
    <div className="w-[560px]">
      <ComparisonChart {...args} />
    </div>
  ),
};

export const DeficitEstimado: Story = {
  args: {
    title: "Déficit estimado de médicos",
    data: deficitData,
    rules: invertedRules,
    referenceLine: {
      value: 1,
      label: "Umbral recomendado / 1.0",
    },
  },
  render: (args) => (
    <div className="w-[560px]">
      <ComparisonChart {...args} />
    </div>
  ),
};

export const CamasHospitalarias: Story = {
  args: {
    title: "Camas hospitalarias por 1000 habitantes",
    data: camasData,
    rules: coberturaRules,
    referenceLine: {
      value: 2.3,
      label: "Referencia mínima OMS / 2.3",
    },
    yDomain: [0, 3],
    chartHeight: 340,
  },
  render: (args) => (
    <div className="w-[680px]">
      <ComparisonChart {...args} />
    </div>
  ),
};

export const PoblacionEnPobreza: Story = {
  args: {
    title: "Población en pobreza",
    data: pobrezaData,
    rules: pobrezaRules,
    referenceLine: {
      value: 30,
      label: "Meta de referencia / 30%",
    },
    yDomain: [0, 80],
    chartHeight: 340,
  },
  render: (args) => (
    <div className="w-[680px]">
      <ComparisonChart {...args} />
    </div>
  ),
};

export const EmptyState: Story = {
  args: {
    data: [],
    emptyMessage: "No hay datos disponibles para esta comparación.",
  },
  render: (args) => (
    <div className="w-[560px]">
      <ComparisonChart {...args} />
    </div>
  ),
};
