import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import type { HealthMapIndicator } from "../../../features/health-map/types/healthMap.types";
import Header from "./Header";
import HeaderActions from "./HeaderActions";

const meta = {
  title: "Components/Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-[96px] w-full bg-[#F8F9FB]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    subtitle: { control: "text" },
    logo: { control: "boolean" },
  },
  args: {
    subtitle: "Tu salud conectada en un solo lugar",
    logo: true,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLogo: Story = {
  args: {
    subtitle: "Vista operativa",
    logo: false,
  },
};

export const WithDashboardActions: Story = {
  render: (args) => {
    const Demo = () => {
      const [category, setCategory] =
        useState<HealthMapIndicator>("medical_coverage");
      const [year, setYear] = useState("2026");
      const [search, setSearch] = useState("");

      return (
        <Header
          {...args}
          actions={
            <HeaderActions
              showCategoryFilter
              showYearFilter
              showSearchBar
              category={category}
              year={year}
              search={search}
              onCategoryChange={setCategory}
              onYearChange={setYear}
              onSearchChange={setSearch}
            />
          }
        />
      );
    };

    return <Demo />;
  },
};
