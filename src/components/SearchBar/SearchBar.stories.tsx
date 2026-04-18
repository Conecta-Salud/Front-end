import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

// 🔹 Variante interactiva (la importante)
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ padding: "20px", background: "#f9fafb" }}>
        <SearchBar {...args} searchTerm={value} onSearch={setValue} />
        <p style={{ marginTop: "10px" }}>Valor: {value}</p>
      </div>
    );
  },
  args: {
    placeholder: "Ingrese el estado o municipio...",
  },
};

// 🔹 Variante con valor inicial
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
