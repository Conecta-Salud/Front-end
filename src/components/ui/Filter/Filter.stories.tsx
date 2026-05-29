import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import Filter from "./Filter";

const categoryOptions = [
  { name: "Cobertura médica", value: "medical_coverage" },
  { name: "Infraestructura hospitalaria", value: "hospital_beds" },
  { name: "Vulnerabilidad poblacional", value: "healthcare_access_deficiency" },
];

const yearOptions = [
  { name: "2024", value: "2024" },
  { name: "2025", value: "2025" },
  { name: "2026", value: "2026" },
];

const stateOptions = [
  { name: "Estado de México", value: "15" },
  { name: "Baja California Sur", value: "03" },
  { name: "San Luis Potosí", value: "24" },
  { name: "Ciudad de México", value: "09" },
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
    allowClear: { control: "boolean" },
    onChange: { action: "changed" },
    onOpenChange: { action: "open changed" },
  },
  args: {
    id: "category",
    title: "Categoría",
    options: categoryOptions,
    values: "",
    isOpen: false,
    allowClear: true,
    onChange: fn(),
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelectedValue: Story = {
  args: {
    values: "medical_coverage",
  },
};

export const Years: Story = {
  args: {
    id: "year",
    title: "Año",
    options: yearOptions,
    values: "2026",
    allowClear: false,
  },
};

export const LongLabels: Story = {
  args: {
    id: "state",
    title: "Estado",
    options: stateOptions,
    values: "09",
  },
};

export const Interactive: Story = {
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState(args.values ?? "");
      const [openId, setOpenId] = useState<string | null>(null);

      return (
        <div className="w-[260px]">
          <Filter
            {...args}
            values={value}
            isOpen={openId === args.id}
            onOpenChange={setOpenId}
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
      const [category, setCategory] = useState("medical_coverage");
      const [year, setYear] = useState("2026");
      const [openId, setOpenId] = useState<string | null>(null);

      return (
        <div className="flex w-[520px] items-center gap-4">
          <Filter
            id="category"
            title="Categoría"
            options={categoryOptions}
            values={category}
            isOpen={openId === "category"}
            onOpenChange={setOpenId}
            onChange={setCategory}
            allowClear={false}
          />

          <Filter
            id="year"
            title="Año"
            options={yearOptions}
            values={year}
            isOpen={openId === "year"}
            onOpenChange={setOpenId}
            onChange={setYear}
            allowClear={false}
          />
        </div>
      );
    };

    return <Demo />;
  },
};
