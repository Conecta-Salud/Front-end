import type { Meta, StoryObj } from "@storybook/react";
import PieChard from "./PieChart";

const meta: Meta<typeof PieChard> = {
  title: "Components/Tables/PieChart",
  component: PieChard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PieChard>;

export const Default: Story = {
  args: {
    isAnimationActive: true,
  },
};

export const WithoutAnimation: Story = {
  args: {
    isAnimationActive: false,
  },
};

export const Interactive: Story = {
  args: {
    isAnimationActive: true,
  },
};
