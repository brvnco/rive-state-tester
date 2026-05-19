import { useEffect } from 'react';
import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceString, Layout, Fit, Alignment } from '@rive-app/react-canvas';

const STATE_MAP = {
  idle: 'idle',
  submitted: 'submitted',
  reasoning: 'reasoning',
  streaming: 'streaming',
  ready: 'ready',
  error: 'err',
};

/**
 * Dytto Rive loader. Drives `ChatLoaderVM.state` in the .riv file.
 *
 * @param {object} props
 * @param {'idle'|'submitted'|'reasoning'|'streaming'|'ready'|'error'} props.state
 * @param {number} [props.size=200] - rendered px (square)
 * @param {string} [props.src='/loader.riv'] - path to the .riv asset
 */
export function Loader({ state = 'idle', size = 200, src = '/loader.riv' }) {
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: 'Chat Loader SM',
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    autoBind: true,
  });

  const viewModel = useViewModel(rive, { name: 'ChatLoaderVM' });
  const viewModelInstance = useViewModelInstance(viewModel, { rive });
  const { setValue: setStateValue } = useViewModelInstanceString('state', viewModelInstance);

  useEffect(() => {
    if (!setStateValue) return;
    setStateValue(STATE_MAP[state] || state);
  }, [state, setStateValue]);

  return (
    <div style={{ width: size, height: size }}>
      <RiveComponent />
    </div>
  );
}
