import { Avatar } from './Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'submitted', 'reasoning', 'streaming', 'ready', 'error'],
    },
    size: { control: { type: 'range', min: 24, max: 144, step: 4 } },
  },
  args: { size: 72 },
};

export const Idle = { args: { state: 'idle' } };
export const Submitted = { args: { state: 'submitted' } };
export const Reasoning = { args: { state: 'reasoning' } };
export const Streaming = { args: { state: 'streaming' } };
export const Ready = { args: { state: 'ready' } };
export const Error = { args: { state: 'error' } };
