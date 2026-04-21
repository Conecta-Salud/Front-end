import type { Meta, StoryObj } from "@storybook/react";
import BarChart from "../../components/BarChart graphic/BarChart";

const meta: Meta<typeof BarChart> = {
  title: "Components/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  argTypes: {
    barColor: { control: "color" },
    gridColor: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

// 🧪 Datos dummy reutilizables
const data = [
  { estado: "Nuevo León", valor: 3.8 },
  { estado: "CDMX", valor: 3.6 },
  { estado: "Querétaro", valor: 3.4 },
  { estado: "Jalisco", valor: 3.2 },
  { estado: "Michoacán", valor: 3.1 },
  { estado: "Morelos", valor: 2.8 },
  { estado: "Guerrero", valor: 2.7 },
  { estado: "Oaxaca", valor: 2.6 },
  { estado: "Chiapas", valor: 2.5 },
];

export const Default: Story = {
  args: {
    data,
    title: "Estados vs médicos por 1000 habitantes",
  },
};

export const Small: Story = {
  args: {
    data,
  },
  render: (args) => (
    <div style={{ width: "400px", height: "250px" }}>
      <BarChart {...args} />
    </div>
  ),
};

export const Large: Story = {
  args: {
    data,
  },
  render: (args) => (
    <div style={{ width: "100%", height: "500px" }}>
      <BarChart {...args} />
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    data,
    barColor: "#14B8A6",
    gridColor: "#e5e7eb",
  },
};

export const FewData: Story = {
  args: {
    data: [
      { estado: "CDMX", valor: 3.6 },
      { estado: "Jalisco", valor: 3.2 },
      { estado: "Chiapas", valor: 2.5 },
    ],
  },
};
