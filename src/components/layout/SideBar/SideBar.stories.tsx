import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "./SideBar";

const meta = {
  title: "Components/Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: ["strategic", "admin"],
    },
    showProfileLabel: {
      control: "boolean",
    },
    profileLabel: {
      control: "text",
    },
  },
  args: {
    role: "strategic",
    showProfileLabel: false,
    profileLabel: "Perfil",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderSidebar = (
  args: Story["args"],
  initialRoute: "/" | "/comparison" | "/admin" | "/profile"
) => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <div className="flex h-screen bg-[#F8F9FB]">
      <Sidebar {...args} />
    </div>
  </MemoryRouter>
);

export const DashboardSelected: Story = {
  render: (args) => renderSidebar(args, "/"),
};

export const ComparisonSelected: Story = {
  render: (args) => renderSidebar(args, "/comparison"),
};

export const AdminSelected: Story = {
  args: {
    role: "admin",
  },
  render: (args) => renderSidebar(args, "/admin"),
};

export const ProfileSelected: Story = {
  render: (args) => renderSidebar(args, "/profile"),
};

export const ProfileWithLabel: Story = {
  args: {
    showProfileLabel: true,
    profileLabel: "Mi perfil",
  },
  render: (args) => renderSidebar(args, "/profile"),
};
