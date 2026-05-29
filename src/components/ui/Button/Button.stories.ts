import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import Button from "./Button";

const meta = {
  title: "Components/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    tone: {
      control: "select",
      options: ["green", "blue", "red"],
    },
    height: {
      control: "select",
      options: ["40", "60"],
    },
    textSize: {
      control: "select",
      options: ["md", "lg"],
    },
    buttonType: {
      control: "select",
      options: ["add", "download"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  args: {
    label: "Continuar",
    tone: "green",
    height: "40",
    textSize: "md",
    loading: false,
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PrimaryAction: Story = {
  args: {
    label: "Nuevo usuario",
    buttonType: "add",
  },
};

export const SecondaryAction: Story = {
  args: {
    label: "Exportar",
    tone: "blue",
    buttonType: "download",
  },
};

export const DestructiveAction: Story = {
  args: {
    label: "Cerrar sesión",
    tone: "red",
  },
};

export const Large: Story = {
  args: {
    label: "Comparar indicadores",
    height: "60",
    textSize: "lg",
  },
};

export const Loading: Story = {
  args: {
    label: "Guardando",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Sin permisos",
    disabled: true,
  },
};
