import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Filter from "./Filter";

const meta: Meta<typeof Filter> = {
  title: "Components/Filter",
  component: Filter,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Filter>;

// 🔹 Datos de ejemplo
const options = [
  { label: "Cobertura Médica", value: "medica" },
  { label: "Hospitales", value: "hospitales" },
  { label: "Clínicas", value: "clinicas" },
];

// 🔹 Variante básica
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ padding: "20px" }}>
        <Filter {...args} values={value} onChange={setValue} />
        <p style={{ marginTop: "10px" }}>Seleccionado: {value}</p>
      </div>
    );
  },
  args: {
    title: "Categoría",
    options,
  },
};

// 🔹 Variante con selección inicial
export const WithSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState("medica,hospitales");

    return (
      <div style={{ padding: "20px" }}>
        <Filter {...args} values={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    title: "Categoría",
    options,
  },
};

// 🔹 Variante tipo Año (como tu UI)
export const YearFilter: Story = {
  render: (args) => {
    const [value, setValue] = useState("2026");

    return (
      <div style={{ padding: "20px" }}>
        <Filter {...args} values={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    title: "Año",
    options: [
      { label: "2022", value: "2022" },
      { label: "2023", value: "2023" },
      { label: "2024", value: "2024" },
      { label: "2025", value: "2025" },
      { label: "2026", value: "2026" },
    ],
  },
};
