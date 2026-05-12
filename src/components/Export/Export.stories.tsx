import type { Meta, StoryObj } from '@storybook/react';
import Export from './Export';

const meta: Meta<typeof Export> = {
  title: 'Components/Modals/Export',
  component: Export,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClose: { action: 'closed' },
    onExport: { action: 'exported' },
  },
};

export default meta;
type Story = StoryObj<typeof Export>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
