import { useState } from 'react';
import { MessageInput } from './MessageInput';

export default {
  title: 'MessageInput',
  component: MessageInput,
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    sending: { control: 'boolean' },
    maxHeight: { control: { type: 'number', min: 60, max: 400, step: 10 } },
    onSubmit: { action: 'submitted' },
  },
};

export const Empty = {
  args: { placeholder: 'Message Dytto…' },
};

export const WithDraft = {
  args: {
    placeholder: 'Message Dytto…',
    value: 'Hey Dytto, can you summarise the latest design review?',
  },
};

export const MultilineDraft = {
  args: {
    placeholder: 'Message Dytto…',
    value:
      'Could you help me with three things?\n\n1. Summarise the call notes\n2. Pull out action items\n3. Draft a follow-up email',
  },
};

export const SendingReply = {
  args: {
    placeholder: 'Message Dytto…',
    value: 'Sounds great, ship it.',
    sending: true,
  },
};

export const Disabled = {
  args: {
    placeholder: 'Connecting…',
    disabled: true,
  },
};

export const Interactive = {
  render: (args) => {
    const [v, setV] = useState('');
    const [last, setLast] = useState(null);
    return (
      <div style={{ width: 600 }}>
        <MessageInput
          {...args}
          value={v}
          onChange={setV}
          onSubmit={(t) => {
            setLast(t);
            setV('');
            args.onSubmit?.(t);
          }}
        />
        <div
          style={{
            maxWidth: 788,
            margin: '12px auto 0',
            padding: '8px 24px',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 12,
            color: '#52525b',
          }}
        >
          Last submitted: <code>{last ?? '—'}</code>
        </div>
      </div>
    );
  },
};
