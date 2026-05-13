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

    isOpen: { control: "boolean" },

    onChange: { action: "changed" },

    onOpenChange: { action: "openChanged" },
  },

  args: {
    id: "filter",
    title: "Categoría",
    options: categoryOptions,
    values: "",
    isOpen: false,
    onChange: fn(),
    onOpenChange: fn(),
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
    id: "years-filter",
    title: "Año",
    options: yearOptions,
    values: "",
  },
};

export const LongLabels: Story = {
  args: {
    id: "state-filter",
    title: "Estado",
    options: longOptions,
    values: "cdmx",
  },
};

export const Interactive: Story = {
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState(args.values ?? "");
      const [openFilter, setOpenFilter] = useState<string | null>(null);

      return (
        <div className="w-[220px]">
          <Filter
            {...args}
            id="interactive-filter"
            values={value}
            isOpen={openFilter === "interactive-filter"}
            onOpenChange={setOpenFilter}
            onChange={setValue}
          />
        </div>
      );
    };

    return <Demo />;
  },
};

export const TwoFiltersTogether: Story = {
  render: () => {
    const Demo = () => {
      const [category, setCategory] = useState("");
      const [year, setYear] = useState("");
      const [openFilter, setOpenFilter] = useState<string | null>(null);

      return (
        <div className="flex items-center gap-4">
          <Filter
            id="category-filter"
            title="Categoría"
            options={categoryOptions}
            values={category}
            isOpen={openFilter === "category-filter"}
            onOpenChange={setOpenFilter}
            onChange={setCategory}
          />

          <Filter
            id="year-filter"
            title="Año"
            options={yearOptions}
            values={year}
            isOpen={openFilter === "year-filter"}
            onOpenChange={setOpenFilter}
            onChange={setYear}
          />
        </div>
      );
    };

    return <Demo />;
  },
};
