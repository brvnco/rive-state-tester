import { Loader } from '../Loader/Loader';

/**
 * Floating chat avatar — renders the Rive bird at avatar size.
 *
 * @param {object} props
 * @param {'idle'|'submitted'|'reasoning'|'streaming'|'ready'|'error'} props.state
 * @param {number} [props.size=72]
 */
export function Avatar({ state = 'idle', size = 72 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader state={state} size={size} />
    </div>
  );
}
