<template>
  <MinifierTemplate
    :version="version"
    :output="output"
    :time="time"
  >
    <td class="min-cssnano-logo-td">
      <a
        href="https://cssnano.github.io/cssnano/playground"
        title="CSSNANO"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 146.7 29.2"
        >
          <path
            fill="#22C37B"
            d="M134.3 0 122 7.1v15l12.3 7.1 12.4-7.1V7zm7.4 19.2-7.4 4.3-7.4-4.3V10l7.4 4.3 7.4-4.3zm-132.2-7H16v-6Q16 0 9.8 0H6.2Q0 0 0 6.2V23q0 6.3 6.2 6.3H10q6.2 0 6.2-6.3v-6.8H9.5v6q0 1.2-1.1 1.2h-.6q-1 0-1-1.2v-15q0-1.2 1-1.2h.6q1 0 1 1.1zM27 10.5h6.5V6.2q0-6.2-6.3-6.2h-3Q18 0 18 6.2v4c0 2.6 1 3.8 3 5.2l5.3 3.2q1 .5 1 1.6v2.1q0 1.2-1.2 1.2h-.5q-1.2 0-1.2-1.2v-3.8H18v4.4q0 6.3 6.2 6.3h3.2q6.2 0 6.2-6.2v-4.2c0-2.6-1-3.8-3-5.1l-5.2-3.2q-1.1-.6-1-1.7v-2q0-1 1.1-1h.5q1 0 1 1zm17.5 0H51V6.2Q51 0 44.7 0h-3q-6.3 0-6.3 6.2v4c0 2.6 1 3.8 3.1 5.2l5.2 3.2q1 .5 1 1.6v2.1q0 1.2-1.2 1.2H43q-1.1 0-1.1-1.2v-3.8h-6.5v4.4q0 6.3 6.2 6.3h3.2q6.2 0 6.2-6.2v-4.2c0-2.6-1-3.8-3-5.1l-5.2-3.2q-1-.6-1-1.7v-2q0-1 1-1h.5q1.2 0 1.2 1z"
          />
          <path
            fill="#ABBAB3"
            d="M54 29.2h4v-24q2-1.4 3.8-1.4Q64 3.8 64 6v23.2h4v-24q0-5-4.8-5.2A7 7 0 0 0 58 2.2V0h-4zm15.7-5q0 4.8 4.7 5 3.5-.2 5-2.2v2.2h4V6.5Q83.4 0 77 0h-.4Q70 0 70 6.5v3.2h4V6.3q0-2.6 2.5-2.6h.3q2.6.1 2.6 2.6V11l-5.5 1.9c-3 1-4.2 2.5-4.2 6zm6 1.1q-2 0-2-2v-4.4c0-1.7.5-2.4 2-3l3.7-1.3V24a6 6 0 0 1-3.7 1.3m9.5 3.9h4v-24q2.1-1.4 3.9-1.4 2 0 2 2.2v23.2h4.1v-24q.1-5-4.9-5.2a7 7 0 0 0-5 2.2V0h-4.1zm23.3-25.4q2.6 0 2.6 2.5v16.5q0 2.6-2.6 2.6h-1q-2.4 0-2.5-2.6V6.3q0-2.5 2.6-2.5zm.1 25.4q6.6 0 6.5-6.5V6.5q0-6.5-6.5-6.5h-1.1Q101 0 101 6.5v16.2q0 6.5 6.5 6.5z"
          />
          <title>CSSNANO logo</title>
        </svg>
      </a>
    </td>
  </MinifierTemplate>
</template>

<script>
import cssnanoPresetAdvanced from 'cssnano-preset-advanced';
import postcss from 'postcss';

import { dependencies } from '../../../package.json' with { type: 'json' };

import minifierMixin from '@/helpers/minifierMixin.js';

const version = dependencies.cssnano.replace('^', '');

export default {
  name: 'MinCssnano',
  mixins: [minifierMixin],
  constants: {
    version
  },
  methods: {
    runner: function (input) {
      const nanoPlugins = cssnanoPresetAdvanced().plugins;
      const postcssPlugins = [];
      for (const plugin of nanoPlugins) {
        const [processor, options] = plugin;
        if (
          typeof options === 'undefined' ||
          (typeof options === 'object' && !options.exclude) ||
          (typeof options === 'boolean' && options === true)
        ) {
          postcssPlugins.push(processor(options));
        }
      }
      return new Promise((resolve, reject) => {
        postcss(postcssPlugins)
          .process(input, { from: './playground.css' })
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      });
    },
    minify: async function () {
      let start = new Date();
      try {
        const result = await this.runner(this.input);
        this.output = result.css;
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
.min-cssnano-logo-td {
  background: var(--light-text);
  border-radius: 0px 10px 10px;
  padding: 0px 3px 0px 4px;
}
.dark .min-cssnano-logo-td {
  background: transparent;
}
</style>
