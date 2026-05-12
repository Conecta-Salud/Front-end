import type { Meta, StoryObj } from "@storybook/react-vite";
import PriorityCard from "./PriorityCard";

const meta = {
  title: "Components/Tables/PriorityCard",
  component: PriorityCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    priority: {
      control: "select",
      options: ["alta", "media", "baja"],
    },
    progress: {
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
    gradientDirection: {
      control: "select",
      options: ["horizontal", "diagonal"],
    },
    showProgress: { control: "boolean" },
  },
  args: {
    title: "Cuernavaca",
    subtitle: "(Morelos)",
    priority: "alta",
    progress: 96,
    showProgress: true,
    metrics: [
      { id: "hospitales", label: "Hospitales por población", value: "4.0" },
      { id: "cobertura", label: "Cobertura médica", value: "0.7" },
      { id: "adultos", label: "Adultos mayores", value: "14%" },
    ],
  },
} satisfies Meta<typeof PriorityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alta: Story = {
  args: {
    priority: "alta",
    title: "Cuernavaca",
    subtitle: "(Morelos)",
    progress: 96,
  },
};

export const Media: Story = {
  args: {
    priority: "media",
    title: "Puebla",
    subtitle: "(Puebla)",
    progress: 58,
    metrics: [
      { id: "hospitales", label: "Hospitales por población", value: "6.1" },
      { id: "cobertura", label: "Cobertura médica", value: "1.5" },
      { id: "adultos", label: "Adultos mayores", value: "11%" },
    ],
  },
};

export const Baja: Story = {
  args: {
    priority: "baja",
    title: "Zapopan",
    subtitle: "(Jalisco)",
    progress: 22,
    metrics: [
      { id: "hospitales", label: "Hospitales por población", value: "8.4" },
      { id: "cobertura", label: "Cobertura médica", value: "2.9" },
      { id: "adultos", label: "Adultos mayores", value: "27%" },
    ],
  },
};

export const DiagonalGradient: Story = {
  args: {
    priority: "alta",
    gradientDirection: "diagonal",
  },
};

export const HorizontalGradient: Story = {
  args: {
    priority: "media",
    gradientDirection: "horizontal",
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: "Cuernavaca",
    subtitle: undefined,
    priority: "alta",
    progress: 96,
  },
};

export const WithoutProgress: Story = {
  args: {
    priority: "baja",
    showProgress: false,
  },
};

export const ClampedProgress: Story = {
  args: {
    title: "Progreso fuera de rango",
    subtitle: "(Prueba)",
    priority: "alta",
    progress: 140,
  },
};

export const LongMetrics: Story = {
  args: {
    title: "Municipio con nombre largo",
    subtitle: "(Estado con nombre largo)",
    priority: "media",
    progress: 64,
    metrics: [
      {
        id: "hospitales",
        label: "Hospitales disponibles por cada 100,000 habitantes",
        value: "3.2",
      },
      {
        id: "cobertura",
        label: "Cobertura médica estimada por población total",
        value: "1.4",
      },
      {
        id: "adultos",
        label: "Porcentaje de adultos mayores en situación vulnerable",
        value: "21%",
      },
    ],
  },
};

export const Comparison: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 w-[1100px]">
      <PriorityCard
        title="Cuernavaca"
        subtitle="(Morelos)"
        priority="alta"
        progress={96}
        gradientDirection="diagonal"
        metrics={[
          { id: "hospitales", label: "Hospitales por población", value: "4.0" },
          { id: "cobertura", label: "Cobertura médica", value: "0.7" },
          { id: "adultos", label: "Adultos mayores", value: "14%" },
        ]}
      />

      <PriorityCard
        title="Puebla"
        subtitle="(Puebla)"
        priority="media"
        progress={58}
        metrics={[
          { id: "hospitales", label: "Hospitales por población", value: "6.1" },
          { id: "cobertura", label: "Cobertura médica", value: "1.5" },
          { id: "adultos", label: "Adultos mayores", value: "11%" },
        ]}
      />

      <PriorityCard
        title="Zapopan"
        subtitle="(Jalisco)"
        priority="baja"
        progress={22}
        metrics={[
          { id: "hospitales", label: "Hospitales por población", value: "8.4" },
          { id: "cobertura", label: "Cobertura médica", value: "2.9" },
          { id: "adultos", label: "Adultos mayores", value: "27%" },
        ]}
      />
    </div>
  ),
};