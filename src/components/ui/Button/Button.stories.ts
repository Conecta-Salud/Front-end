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
    label: "Botón",
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

export const Blue: Story = {
  args: {
    label: "Ver detalles",
    tone: "blue",
  },
};

export const Red: Story = {
  args: {
    label: "Cerrar Sesión",
    tone: "red",
  },
};

export const Height60: Story = {
  args: {
    label: "Comparar",
    height: "60",
    textSize: "lg",
  },
};

export const TextMedium: Story = {
  args: {
    label: "Texto 18px",
    textSize: "md",
  },
};

export const TextLarge: Story = {
  args: {
    label: "Texto 24px",
    textSize: "lg",
  },
};

export const AddButton: Story = {
  args: {
    label: "Nuevo Usuario",
    buttonType: "add",
  },
};

export const DownloadButton: Story = {
  args: {
    label: "Exportar",
    buttonType: "download",
    tone: "blue",
  },
};

export const Loading: Story = {
  args: {
    label: "Cargando",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Deshabilitado",
    disabled: true,
  },
};
