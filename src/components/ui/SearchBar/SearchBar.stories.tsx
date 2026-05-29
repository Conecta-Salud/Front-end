import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import SearchBar from "./SearchBar";

const meta = {
  title: "Components/UI/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    searchTerm: { control: "text" },
    placeholder: { control: "text" },
    onSearch: { action: "searched" },
  },
  args: {
    searchTerm: "",
    placeholder: "Ingrese el estado o municipio...",
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[320px] bg-[#F8F9FB] p-4">
      <SearchBar {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState("");

      return (
        <div className="w-[320px] bg-[#F8F9FB] p-4">
          <SearchBar {...args} searchTerm={value} onSearch={setValue} />
        </div>
      );
    };

    return <Demo />;
  },
};

export const WithValue: Story = {
  args: {
    searchTerm: "Ciudad de México",
  },
  render: (args) => (
    <div className="w-[320px] bg-[#F8F9FB] p-4">
      <SearchBar {...args} />
    </div>
  ),
};
