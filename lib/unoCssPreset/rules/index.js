import { backgroundRules, colorRules } from './color.js';
import { gridRules } from './grid.js';
import { marginRules, paddingRules, stackRules } from './spacing.js';
import { textAlignRules, textTransformRules } from './text.js';
import { a11yRules, appearanceRules, displayRules } from './visibility.js';

export default [
  ...a11yRules,
  ...appearanceRules,
  ...backgroundRules,
  ...colorRules,
  ...displayRules,
  ...gridRules,
  ...marginRules,
  ...paddingRules,
  ...textAlignRules,
  ...textTransformRules,
  ...stackRules,
];
