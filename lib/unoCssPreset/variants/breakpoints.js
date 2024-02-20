function resolveBreakpoints({ theme }) {
  const breakpoints = theme.breakpoints;
  return breakpoints;
}

export function breakpointVariants() {
  const regexCache = {};

  return {
    name: 'breakpoints',
    match(matcher, context) {
      const breakpoints = Object.entries(resolveBreakpoints(context)).map(
        ([name, size], idx) => [name, size, idx]
      );

      for (const [name, size, idx] of breakpoints) {
        if (!regexCache[name]) {
          regexCache[name] = new RegExp(`^${name}(?::|-)`);
        }

        const match = matcher.match(regexCache[name]);

        if (!match) continue;

        const [pre] = match;
        const m = matcher.slice(pre.length);

        return {
          matcher: m,
          handle: (input, next) => {
            return next({
              ...input,
              parent: `${input.parent ? `${input.parent} $$ ` : ''
                }@media (min-width: ${size})`,
              parentOrder: idx,
            });
          },
        };
      }
    },
    multiPass: true,
    autocomplete: '$breakpoints:',
  };
}
