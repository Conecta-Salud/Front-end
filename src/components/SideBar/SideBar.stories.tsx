import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './SideBar';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar', // Organizado en tu carpeta UI
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ height: '100vh', width: '100px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    role: {
      control: 'select',
      options: ['estrategico', 'administrador'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// 1. Vista de Usuario Estratégico (Dos botones principales)
export const Estrategico: Story = {
  args: {
    role: 'estrategico',
    showProfileLabel: false,
  },
};

// 2. Vista de Administrador (Incluye el ícono de Panel Administrador)
export const Administrador: Story = {
  args: {
    role: 'administrador',
    showProfileLabel: false,
  },
};

// 3. Con etiqueta de perfil (Si decides mostrar el nombre del usuario)
export const WithProfileLabel: Story = {
  args: {
    role: 'estrategico',
    profileLabel: 'Juan Pérez',
    showProfileLabel: true,
  },
};