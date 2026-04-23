import type { Meta, StoryObj } from "@storybook/react";
import GraficaComparacion from "./GraficaComparacion";

const meta: Meta<typeof GraficaComparacion> = {
  title: "Components/Tables/GraficaComparacion",
  component: GraficaComparacion,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GraficaComparacion>;

//  Caso base
export const Default: Story = {};

//  Valores bajos
export const LowValues: Story = {
  args: {
    data: [
      { ciudad: "Oaxaca", valor: 2 },
      { ciudad: "Cuernavaca", valor: 1.5 },
    ],
    promedio: 3.2,
  },
};

//  Valores altos
export const HighValues: Story = {
  args: {
    data: [
      { ciudad: "Oaxaca", valor: 6 },
      { ciudad: "Cuernavaca", valor: 5 },
    ],
    promedio: 3.2,
  },
};

//  Mezcla (uno arriba, uno abajo)
export const Mixed: Story = {
  args: {
    data: [
      { ciudad: "Oaxaca", valor: 5 },
      { ciudad: "Cuernavaca", valor: 2 },
    ],
    promedio: 3.2,
  },
};

//  Sin datos
export const Empty: Story = {
  args: {
    data: [],
    promedio: 3.2,
  },
};
