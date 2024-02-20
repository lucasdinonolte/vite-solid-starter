import { definePreset } from 'unocss';

import { extractCustomProperties } from './util/extractCustomProperties.js';

import variants from './variants';
import rules from './rules';

export default definePreset(({ designTokenFiles = [] } = {}) => {
  const { fromCustomProperties, fromCustomMedia } =
    extractCustomProperties(designTokenFiles);

  const res = {
    name: 'uno-preset-custom-properties',
    variants,
    rules,
    theme: {
      colors: fromCustomProperties(/--color-/),
      spacing: fromCustomProperties(/--space-/),
      breakpoints: fromCustomMedia(),
    },
  };

  console.log(res);

  return res;
});
