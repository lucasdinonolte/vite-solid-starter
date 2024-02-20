import fs from 'node:fs';

/**
 * Pluralizes a word naively.
 *
 * @param {string} word
 * @returns {string}
 */
export const pluralize = (word) => {
  if (word.endsWith('s')) return word;
  return `${word}s`;
};

/**
 * Capitalizes a word.
 *
 * @param {string} word
 * @returns {string}
 */
export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Hashes a string.
 *
 * @param {string} str
 * @returns {string}
 */
export const hash = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return hash.toString(16);
};

/**
 * Ensures a file exists (including directories).
 *
 * @param {string} filePath
 * @returns {void}
 */
export const ensureFile = (filePath) => {
  const dir = filePath.split('/').slice(0, -1).join('/');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
};
