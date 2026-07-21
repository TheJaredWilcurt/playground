/* eslint-disable import-x/no-extraneous-dependencies */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vueDevTools from 'vite-plugin-vue-devtools';

const __dirname = import.meta.dirname;

const config = defineConfig({
  base: '/playground',
  build: {
    chunkSizeWarningLimit: 16_000,
    outDir: resolve(__dirname, 'site'),
    sourcemap: false
  },
  plugins: [
    vue(),
    vueDevTools({
      launchEditor: 'subl'
    }),
    nodePolyfills()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'fs/promises': resolve(
        __dirname,
        'node_modules',
        'node-stdlib-browser',
        'esm',
        'mock',
        'empty.js'
      ),
      path: 'path-browserify',
      os: 'os-browserify/browser',
      string_decoder: 'string_decoder/',
      buffer: 'buffer/'
    }
  }
});

export default config;
