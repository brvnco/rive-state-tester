import { Avatar } from '../Avatar/Avatar';

/**
 * One chat message row.
 *
 * @param {object} props
 * @param {'user'|'ai'} props.role
 * @param {string} props.text
 * @param {'idle'|'submitted'|'reasoning'|'streaming'|'ready'|'error'} [props.state] - only meaningful for role="ai"
 * @param {boolean} [props.streaming] - shows a blinking caret on the bubble
 */
export function ChatBubble({ role = 'ai', text = '', state = 'idle', streaming = false }) {
  const isUser = role === 'user';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: 10,
        alignItems: 'flex-start',
        maxWidth: 740,
        margin: '0 auto',
        padding: '5px 24px',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {isUser ? (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#d4d4d8',
            color: '#52525b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          U
        </div>
      ) : (
        <div style={{ marginTop: -8, flexShrink: 0 }}>
          <Avatar state={state} size={72} />
        </div>
      )}

      <div
        style={{
          maxWidth: 'calc(100% - 90px)',
          padding: '9px 13px',
          borderRadius: 14,
          fontSize: 14,
          lineHeight: 1.65,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          background: isUser ? '#e0e7ff' : '#f1f1f3',
          color: isUser ? '#312e81' : '#1a1a1a',
          position: 'relative',
        }}
      >
        {text}
        {streaming && (
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 14,
              marginLeft: 3,
              verticalAlign: '-2px',
              background: '#1a1a1a',
              animation: 'blink 1s steps(1) infinite',
            }}
          />
        )}
      </div>
    </div>
  );
}
