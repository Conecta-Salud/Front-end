import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import CustomInputField from "./CustomInputField";

const meta = {
  title: "Components/UI/CustomInputField",
  component: CustomInputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
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
    name: "email",
    label: "Correo",
    placeholder: "correo@conectasalud.mx",
    value: "",
    type: "email",
    importance: false,
    onChange: fn(),
  },
} satisfies Meta<typeof CustomInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    name: "fullName",
    label: "Nombre completo",
    placeholder: "Nombre y apellidos",
    type: "text",
    importance: true,
  },
};

export const Password: Story = {
  args: {
    name: "password",
    label: "Contraseña",
    placeholder: "Ingresa tu contraseña",
    type: "password",
    importance: true,
  },
};

export const WithValue: Story = {
  args: {
    name: "user",
    label: "Usuario",
    placeholder: "Nombre de usuario",
    value: "Gabriel",
    type: "text",
  },
};
