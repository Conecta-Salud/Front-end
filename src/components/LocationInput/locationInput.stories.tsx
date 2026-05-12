import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import LocationInput from './LocationInput';

const meta: Meta<typeof LocationInput> = {
  title: 'UI/LocationInput', // Ajustado a tu estructura de carpetas vista en Storybook
  component: LocationInput,
  tags: ['autodocs'],
  argTypes: {
    onClear: { action: 'cleared' },
    onChangeText1: { action: 'changed text1' },
    onChangeText2: { action: 'changed text2' },
  },
};

export default meta;
type Story = StoryObj<typeof LocationInput>;

// 1. Estado por defecto (Vacío)
export const Default: Story = {
  args: {
    text1: '',
    text2: '',
  },
};

// 2. Con datos precargados (Como se ve en tu módulo)
export const Filled: Story = {
  args: {
    text1: 'Cuernavaca',
    text2: 'Morelos',
  },
};

// 3. Versión Interactiva (Para probar el teclado en Storybook)
export const Interactive: Story = {
  render: (args) => {
    const [t1, setT1] = useState(args.text1);
    const [t2, setT2] = useState(args.text2);

    return (
      <LocationInput
        {...args}
        text1={t1}
        text2={t2}
        onChangeText1={(val) => setT1(val)}
        onChangeText2={(val) => setT2(val)}
        onClear={() => {
          setT1('');
          setT2('');
          args.onClear();
        }}
      />
    );
  },
  args: {
    text1: 'Zapopan',
    text2: 'Jalisco',
  },
};