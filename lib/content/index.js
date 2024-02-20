import { join } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

import { globSync } from 'glob';
import { z } from 'zod';

import { ensureFile, pluralize, capitalize, hash } from './util';

const makeExportName = (name) => {
  return ['all', capitalize(pluralize(name.toLowerCase()))].join('');
};

const validateContent = async (content, schema) => {
  return await schema.parseAsync(content);
};

const parseJSON = ({ filePathPattern }) => {
  const files = globSync(join(process.cwd(), filePathPattern));
  return files.map((file) => {
    const stringContents = readFileSync(file, 'utf-8');
    return JSON.parse(stringContents);
  });
};

/**
 * Content plugin
 *
 * The idea is that this takes a bunch of content defined
 * in various formats and turns it into a single JavaScript
 * object, so working with your content is as easy as importing
 * it into your javascript code.
 */
const contentPlugin = ({ sources = [], outDir = '.content' }) => {
  const outputPath = join(process.cwd(), outDir, 'index.js');

  let virtualFile;

  const appendToVirtualFile = (name, content) => {
    virtualFile.push(
      `/**
* @type {${typeNamespace}.${name}}
*/
export const ${makeExportName(name)} = ${JSON.stringify(content)};`
    );
  };

  const clearVirtualFile = () => {
    virtualFile = [];
  };

  const parseSource = async ({
    computedFields = {},
    parser,
    name,
    filePathPattern,
    schema,
  }) => {
    const entries = parser({
      name,
      filePathPattern,
      schema,
    });

    const contents = [];

    for (const entry of entries) {
      const content = await validateContent(entry, schema);

      Object.entries(computedFields).forEach(([key, fn]) => {
        content[key] = fn(content);
      });

      contents.push({
        __hash: hash(JSON.stringify(content)),
        ...content,
      });
    }

    appendToVirtualFile(name, contents);
  };

  const init = async () => {
    clearVirtualFile();
    for (const source of sources) {
      await parseSource(source);
    }
    writeVirtualFile();
  };

  const writeVirtualFile = () => {
    ensureFile(outputPath);

    const content = virtualFile.join('\n');
    writeFileSync(outputPath, content);
  };

  return {
    name: 'content',
    async buildStart() {
      await init();
    },
    config: () => ({
      resolve: {
        alias: {
          '@content': outputPath,
        },
      },
    }),
  };
};

const defineSource =
  (parser) =>
    ({
      name,
      schema = ({ z }) => z.object({}).passthrough(),
      computedFields,
      ...rest
    }) => ({
      computedFields,
      parser,
      name,
      schema: schema({ z }),
      ...rest,
    });

/**
 * Turns a folder of JSON files into content.
 *
 * @param{{ computedFields?: Record<string, Function>, name: string, schema?: ({ z }: { z: typeof Zod }) => z.ZodObject, filePathPattern: string }} options
 */
export const defineJSONSource = (options) => defineSource(parseJSON)(options);

export default contentPlugin;
