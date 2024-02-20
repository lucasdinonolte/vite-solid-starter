import { defineConfig } from 'unocss';
import presetCustomProperties from './lib/unoCssPreset';

export default defineConfig({
  content: {
    pipeline: {
      include: ['src/**/*.{jsx,tsx}'],
    },
  },
  presets: [
    presetCustomProperties({
      designTokenFiles: [
        './src/styles/variables.css',
        './src/styles/breakpoints.css',
      ],
    }),
  ],
  // The preset should have everything you need. But of course
  // feel more than free to add your own utility rules or
  // UnoCSS plugins here.
  //
  // See: https://unocss.dev/
});
