// LocationInput.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import LocationInput from './LocationInput';

const meta: Meta<typeof LocationInput> = {
  title: 'Components/LocationInput',
  component: LocationInput,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div 
        style={{ 
          backgroundColor: '#F8FAFC',
          padding: '40px',     
          width: '100vw',      
          height: '100vh', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', 
          boxSizing: 'border-box'
        }}
      >
        {/* Contenedor que limita el ancho máximo, como en un layout real */}
        <div style={{ width: '100%', maxWidth: '1400px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text1: 'Cuernavaca',
    text2: 'Morelos',
    onClear: () => console.log("Limpiar"),
    className: 'w-full' 
  },
};