import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Components/Navigation/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ padding: "20px", background: "#f9fafb" }}>
        <SearchBar {...args} searchTerm={value} onSearch={setValue} />
      </div>
    );
  },
  args: {
    placeholder: "Ingrese el estado o municipio...",
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState("Ciudad de México");

    return (
      <div style={{ padding: "20px" }}>
        <SearchBar {...args} searchTerm={value} onSearch={setValue} />
      </div>
    );
  },
};
