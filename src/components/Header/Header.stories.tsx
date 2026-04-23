import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/UI/Header",
  component: Header,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Header>;

// variante con subtítulo y logo
export const Default: Story = {
  args: {
    subtitle: "Tu salud conectada en un solo lugar",
  },
};

// Sin logo
export const WithoutLogo: Story = {
  args: {
    subtitle: "Sin logo pero con subtítulo",
    logo: false,
  },
};

// Solo título
export const OnlyTitle: Story = {
  args: {
    logo: false,
  },
};
