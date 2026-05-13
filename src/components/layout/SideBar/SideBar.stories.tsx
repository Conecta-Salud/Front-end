import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./SideBar";

const meta = {
  title: "Components/Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ height: "100vh", display: "flex" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    role: {
      control: "select",
      options: ["user", "admin"],
    },
    activeItem: {
      control: "select",
      options: ["dashboard", "comparison", "admin", "profile"],
    },
    showProfileLabel: {
      control: "boolean",
    },
  },
  args: {
    role: "user",
    activeItem: "dashboard",
    showProfileLabel: false,
    profileLabel: "Perfil",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Admin: Story = {
  args: {
    role: "admin",
  },
};

export const DashboardSelected: Story = {
  args: {
    activeItem: "dashboard",
  },
};

export const ComparisonSelected: Story = {
  args: {
    activeItem: "comparison",
  },
};

export const AdminSelected: Story = {
  args: {
    role: "admin",
    activeItem: "admin",
  },
};

export const ProfileSelected: Story = {
  args: {
    activeItem: "profile",
  },
};

export const ProfileWithLabel: Story = {
  args: {
    showProfileLabel: true,
    profileLabel: "Mi Perfil",
  },
};
