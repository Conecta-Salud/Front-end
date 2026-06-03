import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import LocationInput, { type LocationOption } from "./LocationInput";

const locationOptions: LocationOption[] = [
  {
    id: "state-17",
    code: "17",
    name: "Morelos",
    level: "state",
  },
  {
    id: "municipality-17007",
    code: "17007",
    name: "Cuernavaca",
    level: "municipality",
    stateCode: "17",
    stateName: "Morelos",
  },
  {
    id: "state-14",
    code: "14",
    name: "Jalisco",
    level: "state",
  },
  {
    id: "municipality-14120",
    code: "14120",
    name: "Zapopan",
    level: "municipality",
    stateCode: "14",
    stateName: "Jalisco",
  },
  {
    id: "state-09",
    code: "09",
    name: "Ciudad de México",
    level: "state",
  },
];

const meta = {
  title: "Components/UI/LocationInput",
  component: LocationInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    restrictedLevel: {
      control: "select",
      options: [undefined, "state", "municipality"],
    },
    disabled: { control: "boolean" },
    error: { control: "text" },
    onChange: { action: "changed" },
    onClear: { action: "cleared" },
  },
  args: {
    options: locationOptions,
    placeholder: "Selecciona una ubicación",
    disabled: false,
    onChange: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof LocationInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState<LocationOption | null>(null);

      return (
        <div className="w-[720px]">
          <LocationInput
            {...args}
            value={value}
            onChange={setValue}
            onClear={() => setValue(null)}
          />
        </div>
      );
    };

    return <Demo />;
  },
};

export const WithMunicipalitySelected: Story = {
  args: {
    value: locationOptions[1],
  },
  render: (args) => (
    <div className="w-[720px]">
      <LocationInput {...args} />
    </div>
  ),
};

export const OnlyMunicipalities: Story = {
  args: {
    restrictedLevel: "municipality",
  },
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState<LocationOption | null>(null);

      return (
        <div className="w-[720px]">
          <LocationInput {...args} value={value} onChange={setValue} />
        </div>
      );
    };

    return <Demo />;
  },
};

export const ErrorState: Story = {
  args: {
    error: "Selecciona una ubicación para continuar.",
  },
  render: (args) => (
    <div className="w-[720px]">
      <LocationInput {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: locationOptions[0],
    disabled: true,
  },
  render: (args) => (
    <div className="w-[720px]">
      <LocationInput {...args} />
    </div>
  ),
};
