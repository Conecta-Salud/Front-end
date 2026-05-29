import type { Meta, StoryObj } from "@storybook/react-vite";

import PieChart from "./PieChart";

const distributionData = [
  { label: "Hospital general", value: 36, colorToken: "green" as const },
  { label: "Clínica familiar", value: 28, colorToken: "yellow" as const },
  { label: "Centro de salud", value: 22, colorToken: "red" as const },
  { label: "Unidad móvil", value: 14, colorToken: "neutral" as const },
];

const meta = {
  title: "Components/Charts/PieChart",
  component: PieChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    chartHeight: {
      control: { type: "number", min: 240, max: 640, step: 20 },
    },
    showLegend: { control: "boolean" },
    showTitle: { control: "boolean" },
    isAnimationActive: { control: "boolean" },
    emptyMessage: { control: "text" },
  },
  args: {
    title: "Distribución de unidades",
    data: distributionData,
    chartHeight: 320,
    showLegend: true,
    showTitle: true,
    isAnimationActive: true,
  },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[720px]">
      <PieChart {...args} />
    </div>
  ),
};

export const WithoutAnimation: Story = {
  args: {
    isAnimationActive: false,
  },
  render: (args) => (
    <div className="w-[720px]">
      <PieChart {...args} />
    </div>
  ),
};

export const WithoutLegend: Story = {
  args: {
    showLegend: false,
  },
  render: (args) => (
    <div className="w-[520px]">
      <PieChart {...args} />
    </div>
  ),
};

export const EmptyState: Story = {
  args: {
    data: [],
    emptyMessage: "No hay datos para esta gráfica.",
  },
  render: (args) => (
    <div className="w-[720px]">
      <PieChart {...args} />
    </div>
  ),
};
