import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import type { HealthMapIndicator } from "../../../features/health-map/types/healthMap.types";
import HeaderActions from "./HeaderActions";

const meta = {
  title: "Components/Layout/HeaderActions",
  component: HeaderActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    showCategoryFilter: { control: "boolean" },
    showYearFilter: { control: "boolean" },
    showSearchBar: { control: "boolean" },
  },
  args: {
    showCategoryFilter: true,
    showYearFilter: true,
    showSearchBar: true,
    category: "medical_coverage",
    year: "2026",
    search: "",
  },
} satisfies Meta<typeof HeaderActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const Demo = () => {
      const [category, setCategory] = useState<HealthMapIndicator>(
        args.category ?? "medical_coverage"
      );
      const [year, setYear] = useState(args.year ?? "2026");
      const [search, setSearch] = useState(args.search ?? "");

      return (
        <div className="w-[760px] rounded-[10px] bg-white p-4 shadow-sm">
          <HeaderActions
            {...args}
            category={category}
            year={year}
            search={search}
            onCategoryChange={setCategory}
            onYearChange={setYear}
            onSearchChange={setSearch}
          />
        </div>
      );
    };

    return <Demo />;
  },
};

export const FiltersOnly: Story = {
  args: {
    showSearchBar: false,
  },
  render: (args) => (
    <div className="w-[460px] rounded-[10px] bg-white p-4 shadow-sm">
      <HeaderActions {...args} />
    </div>
  ),
};

export const SearchOnly: Story = {
  args: {
    showCategoryFilter: false,
    showYearFilter: false,
    showSearchBar: true,
  },
  render: (args) => (
    <div className="w-[360px] rounded-[10px] bg-white p-4 shadow-sm">
      <HeaderActions {...args} />
    </div>
  ),
};
