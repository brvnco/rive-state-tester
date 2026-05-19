import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * The "Message Dytto…" chat input. Auto-grows up to maxHeight, Enter submits
 * (Shift+Enter = newline), shows a send button that activates on non-empty input.
 *
 * @param {object} props
 * @param {string}   [props.placeholder='Message Dytto…']
 * @param {string}   [props.value]              - controlled value (optional)
 * @param {(v:string)=>void} [props.onChange]   - controlled onChange (optional)
 * @param {(v:string)=>void} [props.onSubmit]   - fired with trimmed text on Enter / send
 * @param {boolean}  [props.disabled=false]     - greys out the input + button entirely
 * @param {boolean}  [props.sending=false]      - input is enabled but send-btn is locked
 *                                                  (used while the model is replying)
 * @param {number}   [props.maxHeight=150]
 */
export function MessageInput({
  placeholder = 'Message Dytto…',
  value,
  onChange,
  onSubmit,
  disabled = false,
  sending = false,
  maxHeight = 150,
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState('');
  const text = isControlled ? value : internal;

  const textareaRef = useRef(null);

  const setText = (v) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  // Auto-grow
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
  }, [text, maxHeight]);

  const trimmed = text.trim();
  const canSend = !disabled && !sending && trimmed.length > 0;

  const submit = () => {
    if (!canSend) return;
    onSubmit?.(trimmed);
    if (!isControlled) setInternal('');
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div
      style={{
        flexShrink: 0,
        padding: '8px 24px 18px',
        maxWidth: 788,
        width: '100%',
        margin: '0 auto',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          background: '#f1f1f3',
          border: '1px solid #e3e3e6',
          borderRadius: 14,
          padding: '10px 10px 10px 14px',
          transition: 'border-color .2s',
          opacity: disabled ? 0.55 : 1,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#6366f1';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e3e3e6';
        }}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#1a1a1a',
            fontSize: 14,
            lineHeight: 1.5,
            resize: 'none',
            fontFamily: 'inherit',
            maxHeight,
            overflowY: 'auto',
          }}
        />
        <button
          type="button"
          onClick={submit}
          disabled={!canSend}
          title="Send (Enter)"
          aria-label="Send message"
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: '#6366f1',
            border: 'none',
            cursor: canSend ? 'pointer' : 'not-allowed',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background .15s, opacity .15s',
            opacity: canSend ? 1 : 0.35,
          }}
          onMouseEnter={(e) => {
            if (canSend) e.currentTarget.style.background = '#4f46e5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#6366f1';
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
