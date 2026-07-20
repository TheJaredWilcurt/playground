/* eslint-disable import-x/no-extraneous-dependencies */
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vueDevTools from 'vite-plugin-vue-devtools';
/* eslint-disable-next-line import-x/extensions */
import { configDefaults } from 'vitest/config';

const __dirname = import.meta.dirname;

const config = defineConfig({
  base: '/playground',
  build: {
    outDir: resolve(__dirname, 'site'),
    sourcemap: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/@thejaredwilcurt\/csslop/,
              name: 'codemirror'
            },
            {
              test: /node_modules\/@csstools\/css-calc/,
              name: 'css-calc'
            },
            {
              test: /node_modules\/@node-projects\/css-parser/,
              name: 'css-parser'
            },
            {
              test: /node_modules\/csskit/,
              name: 'csskit'
            },
            {
              test: /node_modules\/clean-css/,
              name: 'clean-css'
            },
            {
              test: /node_modules\/csso/,
              name: 'csso'
            },
            {
              test: /node_modules\/fflate/,
              name: 'fflate'
            },
            {
              test: /node_modules\/vue-options-api-constants-plugin/,
              name: 'vue-options-api-constants-plugin'
            },
            {
              test: /node_modules\/vue/,
              name: 'vue'
            },
            {
              test: /node_modules/,
              name: 'lib'
            },
            {
              test: /index\.js/,
              name: 'CSSLOP'
            }
          ]
        }
      }
    }
  },
  plugins: [
    vue(),
    vueDevTools({
      launchEditor: 'subl'
    }),
    nodePolyfills()
  ],
  optimizeDeps: {
    exclude: ['vue-dev-tools-accessibility']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@@': fileURLToPath(new URL('./tests', import.meta.url))
    }
  },
  test: {
    coverage: {
      exclude: [
        ...(configDefaults?.coverage?.exclude || []),
        '.eslintrc.cjs',
        './src/main.js',
        '**/scripts/',
        '**/tests/'
      ],
      reportsDirectory: './tests/unit/coverage'
    },
    environment: 'happy-dom',
    // https://github.com/capricorn86/happy-dom/issues/1950
    execArgv: ['--no-experimental-webstorage'],
    globals: true,
    root: '.',
    setupFiles: [
      './tests/unit/setup.js'
    ],
    snapshotSerializers: [
      './node_modules/vue3-snapshot-serializer/index.js'
    ]
  }
});

export default config;
