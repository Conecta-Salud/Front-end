import type { Meta, StoryObj } from "@storybook/react-vite";

import CustomKPI from "./CustomKPI";

const meta = {
  title: "Components/UI/CustomKPI",
  component: CustomKPI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    titleSecondLine: { control: "text" },
    subtitle: { control: "text" },
    value: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "green", "red"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    title: "Usuarios activos",
    value: "34",
    variant: "default",
    size: "md",
    fullWidth: false,
  },
} satisfies Meta<typeof CustomKPI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSubtitle: Story = {
  args: {
    title: "Usuarios activos",
    subtitle: "(últimos 7 días)",
    value: "34",
  },
};

export const TwoLineTitle: Story = {
  args: {
    title: "Total médicos",
    titleSecondLine: "en el país",
    value: "12,540",
  },
};

export const GreenVariant: Story = {
  args: {
    title: "Cobertura hospitalaria",
    value: "84%",
    variant: "green",
  },
};

export const RedVariant: Story = {
  args: {
    title: "Déficit médico",
    titleSecondLine: "zonas rurales",
    value: "-8%",
    variant: "red",
  },
};

export const Small: Story = {
  args: {
    title: "Usuarios",
    value: "151",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    title: "Usuarios activos",
    subtitle: "(últimos 7 días)",
    value: "34",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    title: "Comparaciones",
    titleSecondLine: "realizadas",
    value: "76",
    size: "lg",
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div className="w-[420px]">
      <CustomKPI {...args} />
    </div>
  ),
  args: {
    title: "Usuarios activos",
    subtitle: "(últimos 7 días)",
    value: "34",
    fullWidth: true,
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 flex-wrap">
        <CustomKPI
          title="Usuarios registrados"
          value="151"
          variant="green"
          size="sm"
        />
        <CustomKPI
          title="Usuarios activos"
          subtitle="(últimos 7 días)"
          value="34"
          size="sm"
        />
        <CustomKPI
          title="Comparaciones"
          titleSecondLine="realizadas"
          value="76"
          size="sm"
        />
        <CustomKPI
          title="Reportes"
          titleSecondLine="exportados"
          value="24"
          variant="red"
          size="sm"
        />
      </div>

      <div className="flex gap-4 flex-wrap">
        <CustomKPI
          title="Total médicos"
          titleSecondLine="en el país"
          value="12,540"
          size="md"
        />
        <CustomKPI
          title="Cobertura"
          titleSecondLine="hospitalaria"
          value="84%"
          variant="green"
          size="md"
        />
        <CustomKPI
          title="Déficit"
          titleSecondLine="estimado"
          subtitle="(zonas rurales)"
          value="-8%"
          variant="red"
          size="md"
        />
      </div>

      <div className="w-[500px]">
        <CustomKPI
          title="Usuarios activos"
          subtitle="(últimos 7 días)"
          value="34"
          fullWidth
          size="lg"
        />
      </div>
    </div>
  ),
};