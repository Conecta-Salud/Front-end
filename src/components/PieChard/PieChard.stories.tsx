import type { Meta, StoryObj } from "@storybook/react";
import PieChard from "./PieChard";

const meta: Meta<typeof PieChard> = {
  title: "Components/Tables/PieChart",
  component: PieChard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PieChard>;

// ✅ Default (con animación)
export const Default: Story = {
  args: {
    isAnimationActive: true,
  },
};

// ❌ Sin animación
export const WithoutAnimation: Story = {
  args: {
    isAnimationActive: false,
  },
};

// 🔁 Para probar re-render (útil en debug)
export const Interactive: Story = {
  args: {
    isAnimationActive: true,
  },
};
