export const colorRules = [
  [
    /^(?:color|c)-(.+)$/,
    ([_, key], { theme }) => {
      const color = theme.colors[key];
      if (!color) return null;

      return {
        color,
      };
    },
    { autocomplete: '(color|c)-$colors' },
  ],
];

export const backgroundRules = [
  [
    /^bg-(.+)$/,
    ([_, key], { theme }) => {
      const color = theme.colors[key];
      if (!color) return null;

      return {
        'background-color': color,
      };
    },
    { autocomplete: 'bg-$colors' },
  ],
];
