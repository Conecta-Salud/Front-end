import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import HeaderActions from "./HeaderActions";

const meta: Meta<typeof Header> = {
  title: "Components/UI/Header",
  component: Header,
  tags: ["autodocs"],

  argTypes: {
    subtitle: {
      control: "text",
    },

    logo: {
      control: "boolean",
    },

    actions: {
      control: false,
    },
  },

  args: {
    logo: true,
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    subtitle: "Tu salud conectada en un solo lugar",
  },
};

export const WithoutLogo: Story = {
  args: {
    subtitle: "Sin logo pero con subtítulo",
    logo: false,
  },
};

export const OnlyTitle: Story = {
  args: {
    logo: false,
  },
};

export const WithActions: Story = {
  args: {
    subtitle: "Panel estratégico de salud",
    actions: <HeaderActions showCategoryFilter showYearFilter showSearchBar />,
  },
};

export const WithSearchOnly: Story = {
  args: {
    subtitle: "Búsqueda de estados",
    actions: <HeaderActions showSearchBar />,
  },
};

export const WithFiltersOnly: Story = {
  args: {
    subtitle: "Filtros activos",
    actions: <HeaderActions showCategoryFilter showYearFilter />,
  },
};
