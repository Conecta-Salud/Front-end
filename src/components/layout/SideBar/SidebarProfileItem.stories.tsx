import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { sidebarIcons } from "./SideBar.config";
import SidebarProfileItem from "./SidebarProfileItem";

const meta = {
  title: "Components/Layout/SidebarProfileItem",
  component: SidebarProfileItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
    label: { control: "text" },
    onPress: { action: "pressed" },
  },
  args: {
    avatar: sidebarIcons.profile,
    label: "Perfil",
    selected: false,
    onPress: fn(),
  },
} satisfies Meta<typeof SidebarProfileItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[100px]" style={{ background: "var(--gradient-primary-green)" }}>
      <SidebarProfileItem {...args} />
    </div>
  ),
};

export const Selected: Story = {
  args: {
    selected: true,
  },
  render: (args) => (
    <div className="w-[100px]" style={{ background: "var(--gradient-primary-green)" }}>
      <SidebarProfileItem {...args} />
    </div>
  ),
};
