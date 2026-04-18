import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import CustomInputField from "./CustomInputField";

const meta = {
  title: "Components/CustomInputField",
  component: CustomInputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email"],
    },
    importance: {
      control: "boolean",
    },
    onChange: {
      action: "changed",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof CustomInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    value: "",
    type: "text",
    importance: false,
  },
};

export const Required: Story = {
  args: {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    value: "",
    type: "text",
    importance: true,
  },
};

export const Email: Story = {
  args: {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    value: "",
    type: "email",
    importance: true,
  },
};

export const Password: Story = {
  args: {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    value: "",
    type: "password",
    importance: true,
  },
};

export const WithValue: Story = {
  args: {
    name: "user",
    label: "User",
    placeholder: "Enter your user",
    value: "Gabriel",
    type: "text",
    importance: false,
  },
};