<template>
  <MinifierTemplate
    :version="version"
    :output="output"
    :time="time"
    :winner="winner"
  >
    <td>
      <a
        class="min-esbuild-link"
        href="https://esbuild.github.io/try/#YgAwLjI4LjEAZmlsZS5jc3MgLS1taW5pZnkAAGZpbGUuY3NzAA"
        title="ESBuild"
      >
        <svg
          class="min-esbuild-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="100"
            fill="#FFCF00"
          />
          <path
            fill="none"
            stroke="#191919"
            stroke-width="24"
            d="m48 53 47 47-47 48m60-95 47 47-47 48"
          />
          <title>ESBuild logo</title>
        </svg>
        esbuild
      </a>
    </td>
  </MinifierTemplate>
</template>

<script>
import * as esbuild from 'esbuild-wasm';

import { dependencies } from '../../../package.json' with { type: 'json' };

import minifierMixin from '@/helpers/minifierMixin.js';

const version = esbuild.version;

export default {
  name: 'MinSass',
  mixins: [minifierMixin],
  data: function () {
    return {
      initialized: false
    };
  },
  constants: {
    version
  },
  methods: {
    minify: async function () {
      if (!this.initialized) {
        await esbuild.initialize({
          wasmModule: await WebAssembly.compileStreaming(fetch('/playground/node_modules/esbuild-wasm/esbuild.wasm'))
        });
      }
      this.initialized = true;
      let start = new Date();
      try {
        const options = {
          logLevel: 'silent',
          stdin: {
            contents: this.input,
            resolveDir: './src',
            sourcefile: 'imaginary-file.js',
            loader: 'css',
          },
          minify: true
        };
        const result = await esbuild.build(options);
        const code = result.outputFiles[0].contents;
        const minified = new TextDecoder().decode(code);
        this.output = (minified || '').trim();
      } catch {
        /**/
      }
      let end = new Date();
      this.duration = end - start;
    }
  }
};
</script>

<style>
.min-esbuild-link {
  --min-esbuild-font-size: 10px;
  --min-esbuild-font-to-image-ratio: 1.25;
  --min-esbuild-logo-size: calc(
    var(--min-esbuild-font-to-image-ratio) * var(--min-esbuild-font-size)
  );
  --min-esbuild-logo-padding: calc(var(--min-esbuild-logo-size) / 4);
  display: flex;
  align-content: center;
  justify-content: center;
  gap: var(--min-esbuild-logo-padding);
  height: var(--logo-box-height);
  width: var(--logo-box-width);
  background: #FFF;
  border-radius: 0px 10px 10px;
  color: #000;
  font-family: sans-serif;
  font-size: var(--min-esbuild-font-size);
  font-weight: 700;
  line-height: var(--logo-box-height);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.dark .min-esbuild-link {
  background: #191919;
  color: #DDD;
}
.min-esbuild-logo {
  width: var(--min-esbuild-logo-size);
  height: var(--logo-box-height);
}
</style>
