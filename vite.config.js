import path from 'node:path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import Pages from 'vite-plugin-pages';
import UnoCSS from 'unocss/vite';
import imagePresets, { widthPreset } from 'vite-plugin-image-presets';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },

  /**
   * Only env variables prefixed with PUBLIC_ will be exposed to the
   * client side code. This prevents exposing secrets accidentally.
   */
  envPrefix: 'PUBLIC_',
  plugins: [
    UnoCSS(),
    solid({ ssr: true }),
    Pages({
      dirs: './src/pages/',
      exclude: ['**/_*.jsx'],
      extensions: ['jsx'],
      moduleId: '@routes',
      resolver: 'solid',
      routeStyle: 'next',
      importMode: 'sync',
    }),

    /**
     * The default preset generates webp srcsets for imported images on
     * the fly. To use it you have to append it to the imports search
     * parameter like this:
     *
     * import myImg from '@assets/image.jpg?preset=default';
     */
    imagePresets({
      default: widthPreset({
        widths: [300, 600, 1200, 2000],
        formats: {
          webp: {},
        },
      }),
    }),
  ],

  test: {
    environment: 'jsdom',
    setupFiles: 'test.setup.js',
  },
});
