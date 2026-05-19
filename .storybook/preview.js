/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'surface', value: '#ffffff' },
        { name: 'dark', value: '#0c0c0c' },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // Chromatic: pause Rive animations on a fixed frame for stable visual diffs
    chromatic: { pauseAnimationAtEnd: true, delay: 800 },
    layout: 'centered',
  },
};
export default preview;
