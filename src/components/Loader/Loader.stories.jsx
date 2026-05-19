import { Loader } from './Loader';

export default {
  title: 'Loader',
  component: Loader,
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'submitted', 'reasoning', 'streaming', 'ready', 'error'],
    },
    size: { control: { type: 'range', min: 60, max: 400, step: 10 } },
  },
  args: { size: 200 },
};

export const Idle = { args: { state: 'idle' } };
export const Submitted = { args: { state: 'submitted' } };
export const Reasoning = { args: { state: 'reasoning' } };
export const Streaming = { args: { state: 'streaming' } };
export const Ready = { args: { state: 'ready' } };
export const Error = { args: { state: 'error' } };
