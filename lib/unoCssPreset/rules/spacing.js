import { toEscapedSelector } from 'unocss';

export const directionMap = {
  l: ['-left'],
  r: ['-right'],
  t: ['-top'],
  b: ['-bottom'],
  s: ['-inline-start'],
  e: ['-inline-end'],
  x: ['-left', '-right'],
  y: ['-top', '-bottom'],
  '': [''],
  bs: ['-block-start'],
  be: ['-block-end'],
  is: ['-inline-start'],
  ie: ['-inline-end'],
  block: ['-block-start', '-block-end'],
  inline: ['-inline-start', '-inline-end'],
};

function directionSize(propertyPrefix) {
  return ([_, direction, size], { theme }) => {
    const v = theme.spacing?.[size || 'DEFAULT'] ?? size;
    if (v != null) {
      const res = directionMap[direction].map((i) => [
        `${propertyPrefix}${i}`,
        v,
      ]);
      return res;
    }
  };
}

export const paddingRules = [
  [
    /^pa?()-?(-?.+)$/,
    directionSize('padding'),
    { autocomplete: ['(m|p)<num>', '(m|p)-<num>'] },
  ],
  [/^p-?xy()()$/, directionSize('padding'), { autocomplete: '(m|p)-(xy)' }],
  [/^p-?([xy])(?:-?(-?.+))?$/, directionSize('padding')],
  [
    /^p-?([rltbse])(?:-?(-?.+))?$/,
    directionSize('padding'),
    { autocomplete: '(m|p)<directions>-<num>' },
  ],
  [
    /^p-(block|inline)(?:-(-?.+))?$/,
    directionSize('padding'),
    { autocomplete: '(m|p)-(block|inline)-<num>' },
  ],
  [
    /^p-?([bi][se])(?:-?(-?.+))?$/,
    directionSize('padding'),
    { autocomplete: '(m|p)-(bs|be|is|ie)-<num>' },
  ],
];

export const marginRules = [
  [/^ma?()-?(-?.+)$/, directionSize('margin')],
  [/^m-?xy()()$/, directionSize('margin')],
  [/^m-?([xy])(?:-?(-?.+))?$/, directionSize('margin')],
  [/^m-?([rltbse])(?:-?(-?.+))?$/, directionSize('margin')],
  [/^m-(block|inline)(?:-(-?.+))?$/, directionSize('margin')],
  [/^m-?([bi][se])(?:-?(-?.+))?$/, directionSize('margin')],
];

export const stackRules = [
  [
    /^stack-([xy])(?:-?(-?.+))?$/,
    ([_, direction, size], { theme }) => {
      const v = theme.spacing?.[size || 'DEFAULT'];
      const results = directionMap[direction].map((item) => {
        const key = `margin${item}`;
        const value =
          item.endsWith('right') || item.endsWith('bottom')
            ? `calc(${v} * var(--stack-reverse, 0))`
            : `calc(${v} * calc(1 - var(--stack-reverse, 0)))`;

        return [key, value];
      });

      if (results) {
        return [[`--un-space-${direction}-reverse`, 0], ...results];
      }
    },
    { autocomplete: 'stack-(x|y)-$spacing' },
  ],
];
