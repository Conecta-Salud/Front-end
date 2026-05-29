import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import ImportButton from "./ImportButton";

const meta = {
  title: "Components/UI/ImportButton",
  component: ImportButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    accept: { control: "text" },
    onFileSelect: { action: "file selected" },
  },
  args: {
    accept: ".csv,.xlsx",
    onFileSelect: fn(),
  },
} satisfies Meta<typeof ImportButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CsvOnly: Story = {
  args: {
    accept: ".csv",
  },
};
