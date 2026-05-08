// Usa "import type" para asegurar que solo se traigan los tipos de TS
import type { Meta, StoryObj } from '@storybook/react';
import ModuloComparacionPage from '../pages/comparison';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Pages/ModuloComparacion',
  component: ModuloComparacionPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ModuloComparacionPage>; // Uso de satisfies para mejor compatibilidad

export default meta;
type Story = StoryObj<typeof meta>; // Basar el tipo Story directamente en el objeto meta

export const Default: Story = {};