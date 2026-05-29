import type { Meta, StoryObj } from "@storybook/react-vite";

import BarChart from "./BarChart";

const basicData = [
  { label: "CDMX", value: 3.2, colorToken: "green" as const },
  { label: "Jalisco", value: 2.8, colorToken: "green" as const },
  { label: "Nuevo León", value: 3.5, colorToken: "green" as const },
  { label: "Puebla", value: 2.6, colorToken: "yellow" as const },
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

const meta = {
  title: "Components/Charts/BarChart",
  component: BarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    barColor: { control: "color" },
    chartHeight: {
      control: { type: "number", min: 200, max: 700, step: 20 },
    },
    showAverageLine: { control: "boolean" },
    showTitle: { control: "boolean" },
    emptyMessage: { control: "text" },
    yDomain: { control: "object" },
    referenceLine: { control: "object" },
  },
  args: {
    title: "Estados vs médicos por 1000 habitantes",
    data: basicData,
    chartHeight: 320,
    showAverageLine: false,
    showTitle: true,
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[720px]">
      <BarChart {...args} />
    </div>
  ),
};

export const LongLabels: Story = {
  args: {
    title: "Estados con nombres largos",
    data: longLabelData,
  },
  render: (args) => (
    <div className="w-[720px]">
      <BarChart {...args} />
    </div>
  ),
};

export const LargeValues: Story = {
  args: {
    title: "Capacidad hospitalaria",
    data: largeValuesData,
  },
  render: (args) => (
    <div className="w-[720px]">
      <BarChart {...args} />
    </div>
  ),
};

export const WithReferenceLine: Story = {
  args: {
    referenceLine: {
      value: 2.3,
      label: "Referencia OMS / 2.3",
    },
    yDomain: [0, 4],
  },
  render: (args) => (
    <div className="w-[720px]">
      <BarChart {...args} />
    </div>
  ),
};

export const EmptyState: Story = {
  args: {
    data: [],
    emptyMessage: "No hay datos para esta selección.",
  },
  render: (args) => (
    <div className="w-[720px]">
      <BarChart {...args} />
    </div>
  ),
};
