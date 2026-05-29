import type { Meta, StoryObj } from "@storybook/react-vite";

import SelectedLabel from "./SelectedLabel";

const meta = {
  title: "Components/UI/SelectedLabel",
  component: SelectedLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
  args: {
    label: "Cobertura médica",
  },
} satisfies Meta<typeof SelectedLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongLabel: Story = {
  args: {
    label: "Vulnerabilidad poblacional",
  },
};
