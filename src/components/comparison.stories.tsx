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
} satisfies Meta<typeof ModuloComparacionPage>;

export default meta;
type Story = StoryObj<typeof meta>; 

export const Default: Story = {};