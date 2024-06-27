import '../src/index.css';
import '../src/App.css';

import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <div style={{ margin: '1em' }}>
      <div
        style={{
          outline: '2px solid #0001',
        }}
      >
        <Story />
      </div>
    </div>
  ),
];
