import { ChatBubble } from './ChatBubble';

export default {
  title: 'ChatBubble',
  component: ChatBubble,
  argTypes: {
    role: { control: 'radio', options: ['ai', 'user'] },
    state: {
      control: 'select',
      options: ['idle', 'submitted', 'reasoning', 'streaming', 'ready', 'error'],
    },
    streaming: { control: 'boolean' },
  },
};

export const UserMessage = {
  args: { role: 'user', text: 'Hey, can you summarise this PDF?' },
};

export const AIReady = {
  args: {
    role: 'ai',
    state: 'ready',
    text: 'Sure! The document covers three main topics: onboarding, retention, and pricing.',
  },
};

export const AIStreaming = {
  args: {
    role: 'ai',
    state: 'streaming',
    streaming: true,
    text: 'Sure! The document covers three main topics: onboarding, retention',
  },
};

export const AIReasoning = {
  args: {
    role: 'ai',
    state: 'reasoning',
    text: '',
  },
};

export const AIError = {
  args: {
    role: 'ai',
    state: 'error',
    text: 'Something went wrong while processing your request.',
  },
};
