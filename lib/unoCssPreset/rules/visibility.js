export const displayRules = [
  ['hide', { display: 'none' }],
  ['show', { display: 'initial' }],
];

export const appearanceRules = [
  ['visible', { visibility: 'visible' }],
  ['invisible', { visibility: 'hidden' }],
];

export const a11yRules = [
  [
    'sr-only',
    {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      'white-space': 'nowrap',
      border: '0',
    },
  ],
];
