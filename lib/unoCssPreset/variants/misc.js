export const variantStack = {
  name: 'variantStack',
  match(matcher) {
    if (matcher.startsWith('_')) return;

    if (/stack-([xy])-(-?.+)$/.test(matcher)) {
      return {
        matcher,
        selector: (input) => {
          const not = '>:not([hidden])~:not([hidden])';
          return input.includes(not) ? input : `${input}${not}`;
        },
      };
    }
  },
};
