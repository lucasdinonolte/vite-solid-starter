import { readFileSync } from 'fs';
import postcss from 'postcss';

const customMediaNameRegExp = /^custom-media$/i;
const customMediaParamsRegExp = /^(--[A-z][\w-]*)\s+([\W\w]+)\s*$/;
const customMediaValueRegExp = /min-width:[ ]?([0-9]+px|rem|em)/;

/**
 * @param {import('postcss').Node} node
 * @returns boolean
 */
const isCustomMedia = (node) =>
  node.type === 'atrule' &&
  customMediaNameRegExp.test(node.name) &&
  customMediaParamsRegExp.test(node.params);

/**
 * Ensures the input is an array.
 *
 * @param {T|Array<T>} input
 * @returns {Array<T>}
 */
const ensureArray = (input) => [input].flat().filter(Boolean);

/**
 * Reads in a CSS file with CSS variables and returns a function that
 * turns those variables into a object that can be passed to a
 * TailwdindCSS (or UnoCSS) config.
 *
 * @param {string|Array<string>} entry - absolute path to the CSS file or files containing the CSS variables
 * @returns {{ fromCustomProperties: {(regex: RegExp) => Record<string, string>}, fromCustomMedia: {() => Record<string, string>} }}
 */
export const extractCustomProperties = (entry) => {
  const source = ensureArray(entry)
    .map((f) => readFileSync(f, 'utf-8'))
    .join('');

  const root = postcss.parse(source);

  const variables = new Set();

  // Find all custom properties
  root.walkDecls((decl) => {
    if (decl.parent?.selector === ':root') {
      variables.add(decl.prop);
    }
  });

  return {
    fromCustomProperties: (regex) => {
      const config = {};

      for (const variable of variables.values()) {
        if (variable.match(regex)) {
          const key = variable.replace(regex, '');
          config[key] = `var(${variable})`;
        }
      }

      return config;
    },
    fromCustomMedia: () => {
      const breakpoints = {};

      // Heavily inspired by how postcss-custom-media does it
      // SEE: https://github.com/csstools/postcss-custom-media/blob/master/lib/custom-media-from-root.js
      root.nodes.slice().forEach((node) => {
        if (isCustomMedia(node)) {
          const [, name, selectors] = node.params.match(
            customMediaParamsRegExp
          );

          if (!selectors.match(customMediaValueRegExp)) {
            console.log(
              `Only min-width style media queries are supported. Skipping ${name}.`
            );
            return;
          }

          const [, value] = selectors.match(customMediaValueRegExp);

          // Remove leading -- from name
          const key = name.slice(2);

          breakpoints[key] = value;
        }
      });

      return breakpoints;
    },
  };
};
