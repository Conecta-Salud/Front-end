import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import CustomButton from './Button';

const meta = {
  title: 'Components/CustomButton',
  component: CustomButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'default'],
      description: 'Define el color temático del botón',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Define el estilo visual del botón',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Define el tamaño del botón',
    },
    isLoading: {
      control: 'boolean',
      description: 'Muestra un estado de carga',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Deshabilita la interacción',
    },
    onPress: { 
      action: 'pressed',
      description: 'Función que se ejecuta al hacer clic' 
    },
  },
  args: {
    title: 'Botón de Acción',
    color: 'primary',
    variant: 'solid',
    size: 'md',
    isLoading: false,
    isDisabled: false,
    onPress: fn(),
  },
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Variante Principal (Uso médico: Buscar)
export const Default: Story = {
  args: {
    title: 'Buscar Centros de Salud',
    color: 'primary',
    variant: 'solid',
  },
};

// 2. Variante Secundaria (Uso médico: Nueva consulta)
export const Secondary: Story = {
  args: {
    title: 'Nueva Búsqueda',
    color: 'primary',
    variant: 'outline',
  },
};

// 3. Variante Crítica (Uso médico: Cancelar cita)
export const Danger: Story = {
  args: {
    title: 'Cancelar Cita Médica',
    color: 'danger',
    variant: 'solid',
  },
};

// 4. Variante de Éxito o Registro
export const Success: Story = {
  args: {
    title: 'Confirmar Registro',
    color: 'secondary', // Usamos el color secundario definido en tu sistema
    variant: 'solid',
    className: 'shadow-lg',
  },
};

// 5. Botón Personalizado (Ancho completo y grande)
export const FullWidthCustom: Story = {
  args: {
    title: 'AGENDAR CITA AHORA',
    className: 'w-[450px] h-[60px] uppercase tracking-widest bg-emerald-500',
    textClassName: 'text-xl', // Si añadiste esta prop en el componente
  },
};

// 6. Estado de Carga
export const Loading: Story = {
  args: {
    title: 'Procesando...',
    isLoading: true,
  },
};

// 7. Botón Deshabilitado
export const Disabled: Story = {
  args: {
    title: 'No disponible',
    isDisabled: true,
  },
};