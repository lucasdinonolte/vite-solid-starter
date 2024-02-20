import { toEscapedSelector } from 'unocss';

export const gridRules = [
  [
    /^row$/,
    (_, { rawSelector }) => {
      const selector = toEscapedSelector(rawSelector);

      return `${selector} {
          --gutter: var(--grid-gutter, var(--layout-grid-gutter, 0));
          display: flex;
          flex-flow: row wrap;
          margin-right: calc(var(--gutter) / 2 * -1);
          margin-left: calc(var(--gutter) / 2 * -1);
        }

        ${selector} > * {
          width: 100%;
          padding-right: calc(var(--gutter) / 2);
          padding-left: calc(var(--gutter) / 2);
        }`;
    },
  ],
  [
    /^col-(\d+)\/(\d+)$/,
    ([_, span, total]) => {
      return {
        width: `calc(100% / ${total} * ${span})`,
      };
    },
  ],
  [
    /^push-(\d+)\/(\d+)$/,
    ([_, span, total]) => {
      return {
        'margin-left': `calc(100% / ${total} * ${span})`,
      };
    },
  ],
];
