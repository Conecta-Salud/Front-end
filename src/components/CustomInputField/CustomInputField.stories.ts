import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import CustomInputField from './CustomInputField';

const meta = {
  title: 'Components/CustomInputField',
  component: CustomInputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email'],
    },
    importance: {
      control: 'boolean',
    },
    onChange: {
      action: 'changed',
    },
  },
  args: {
    name: 'email',
    label: 'Correo electrónico',
    placeholder: 'Usuario_admin@conectasalud.com',
    value: '',
    type: 'email',
    importance: false,
    onChange: fn(),
  },
} satisfies Meta<typeof CustomInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Email: Story = {
  args: {
    name: 'email',
    label: 'Correo electrónico',
    placeholder: 'Usuario_admin@conectasalud.com',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    type: 'password',
  },
};

export const Required: Story = {
  args: {
    name: 'email',
    label: 'Correo electrónico',
    placeholder: 'usuario@correo.com',
    type: 'email',
    importance: true,
  },
};

export const WithValue: Story = {
  args: {
    name: 'email',
    label: 'Correo electrónico',
    value: 'usuario@correo.com',
    type: 'email',
  },
};