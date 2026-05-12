import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import Filter from "./Filter";

const categoryOptions = [
  { name: "Cobertura médica", value: "coverage" },
  { name: "Déficit de médicos", value: "deficit" },
  { name: "Camas hospitalarias", value: "beds" },
  { name: "Población en pobreza", value: "poverty" },
];

const yearOptions = [
  { name: "2022", value: "2022" },
  { name: "2023", value: "2023" },
  { name: "2024", value: "2024" },
  { name: "2025", value: "2025" },
  { name: "2026", value: "2026" },
];

const longOptions = [
  { name: "Estado de México", value: "edomex" },
  { name: "Baja California Sur", value: "bcs" },
  { name: "San Luis Potosí", value: "slp" },
  { name: "Ciudad de México", value: "cdmx" },
];

const meta = {
  title: "Components/UI/Filter",
  component: Filter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    values: { control: "text" },
    options: { control: "object" },
    onChange: { action: "changed" },
  },
  args: {
    title: "Categoría",
    options: categoryOptions,
    values: "",
    onChange: fn(),
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSelectedValue: Story = {
  args: {
    title: "Categoría",
    options: categoryOptions,
    values: "coverage",
  },
};

export const Years: Story = {
  args: {
    title: "Año",
    options: yearOptions,
    values: "",
  },
};

export const LongLabels: Story = {
  args: {
    title: "Estado",
    options: longOptions,
    values: "cdmx",
  },
};

export const Interactive: Story = {
  args: {},
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState(args.values ?? "");

      return (
        <div className="w-[220px]">
          <Filter
            {...args}
            values={value}
            onChange={setValue}
          />
        </div>
      );
    };

    return <Demo />;
  },
};

export const TwoFiltersTogether: Story = {
  args: {},
  render: () => {
    const Demo = () => {
      const [category, setCategory] = useState("");
      const [year, setYear] = useState("");

      return (
        <div className="flex items-center gap-4">
          <Filter
            title="Categoría"
            options={categoryOptions}
            values={category}
            onChange={setCategory}
          />

          <Filter
            title="Año"
            options={yearOptions}
            values={year}
            onChange={setYear}
          />
        </div>
      );
    };

    return <Demo />;
  },
};