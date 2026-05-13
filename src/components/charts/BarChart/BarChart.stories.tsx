import type { Meta, StoryObj } from "@storybook/react-vite";
import BarChart from "./BarChart";

const meta = {
  title: "Components/Tables/CustomBarChart",
  component: BarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    barColor: { control: "color" },
    gridColor: { control: "color" },
    chartHeight: {
      control: { type: "number", min: 200, max: 700, step: 20 },
    },
    showAverageLine: {
      control: "boolean",
    },
    yDomain: {
      control: "object",
    },
  },
  args: {
    title: "Gráfica de barras",
    chartHeight: 320,
    showAverageLine: false,
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicData = [
  { label: "CDMX", value: 3.2 },
  { label: "Jalisco", value: 2.8 },
  { label: "Nuevo León", value: 3.5 },
  { label: "Puebla", value: 2.6 },
];

const longLabelData = [
  { label: "Estado de México", value: 2.9 },
  { label: "Baja California Sur", value: 3.1 },
  { label: "San Luis Potosí", value: 2.7 },
  { label: "Aguascalientes", value: 3.0 },
];

const largeValuesData = [
  { label: "Hospital A", value: 120 },
  { label: "Hospital B", value: 340 },
  { label: "Hospital C", value: 220 },
  { label: "Hospital D", value: 410 },
];

const smallValuesData = [
  { label: "Zona 1", value: 0.2 },
  { label: "Zona 2", value: 0.5 },
  { label: "Zona 3", value: 0.8 },
  { label: "Zona 4", value: 0.3 },
];

export const Default: Story = {
  args: {
    title: "Estados vs médicos",
    data: basicData,
  },
};

export const LongLabels: Story = {
  args: {
    title: "Estados con nombres largos",
    data: longLabelData,
  },
};

export const LargeValues: Story = {
  args: {
    title: "Capacidad hospitalaria",
    data: largeValuesData,
  },
};

export const SmallValues: Story = {
  args: {
    title: "Indicadores pequeños",
    data: smallValuesData,
  },
};

export const CustomColor: Story = {
  args: {
    title: "Color personalizado",
    data: basicData,
    barColor: "#3B82F6",
  },
};

export const CustomGrid: Story = {
  args: {
    title: "Grid personalizado",
    data: basicData,
    gridColor: "#D1D5DB",
  },
};

export const WithAverageLine: Story = {
  args: {
    title: "Con línea de promedio",
    data: basicData,
    showAverageLine: true,
  },
};

export const LargeValuesWithAverage: Story = {
  args: {
    title: "Valores grandes con promedio",
    data: largeValuesData,
    showAverageLine: true,
  },
};
