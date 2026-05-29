import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { sidebarIcons } from "./SideBar.config";
import SideBarItem from "./SideBarItem";

const meta = {
  title: "Components/Layout/SideBarItem",
  component: SideBarItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
    onPress: { action: "pressed" },
  },
  args: {
    id: "dashboard",
    label: "Dashboard Estratégico",
    icon: sidebarIcons.dashboard,
    selected: false,
    onPress: fn(),
  },
} satisfies Meta<typeof SideBarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[100px]" style={{ background: "var(--gradient-primary-green)" }}>
      <SideBarItem {...args} />
    </div>
  ),
};

export const Selected: Story = {
  args: {
    selected: true,
  },
  render: (args) => (
    <div className="w-[100px]" style={{ background: "var(--gradient-primary-green)" }}>
      <SideBarItem {...args} />
    </div>
  ),
};
