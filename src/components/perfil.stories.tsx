import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import PerfilPage from '../pages/perfil';

const meta: Meta<typeof PerfilPage> = {
  title: 'Pages/PerfilPage',
  component: PerfilPage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen', // Para que el layout ocupe toda la pantalla de Storybook sin márgenes extra
  },
};

export default meta;
type Story = StoryObj<typeof PerfilPage>;

export const Default: Story = {};