<template>
  <div class="playground-container">
    <form
      class="playground-form"
      @submit.prevent
    >
      <label
        for="input"
        class="playground-label"
      >
        Input ({{ input.length.toLocaleString() }})
      </label>
      <div class="playground-input-container">
        <textarea
          v-model="input"
          id="input"
          class="playground-input"
        ></textarea>
      </div>
    </form>
    <table class="playground-table">
      <thead>
        <tr>
          <th>Minifier</th>
          <th>Version</th>
          <th>Time</th>
          <th>Output</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        <Component
          v-for="(minifier, key) in minifiers"
          :is="minifier"
          :input="input"
          :winner="winners.includes(key)"
          @minified="setOutput(key, $event)"
          @version="setVersion(key, $event)"
          :key="key"
        />
      </tbody>
    </table>
    <MarkDownTable
      :output="output"
      :versions="versions"
    />
  </div>
</template>

<script>
import {
  strFromU8,
  strToU8,
  unzlibSync,
  zlibSync
} from 'fflate';

import { asyncify } from '@/helpers/helpers.js';

const minifiers = {
  csslop: asyncify(() => import('@/components/minifiers/MinCsslop.vue')),
  lightning: asyncify(() => import('@/components/minifiers/MinLightning.vue')),
  cssnano: asyncify(() => import('@/components/minifiers/MinCssnano.vue')),
  cleancss: asyncify(() => import('@/components/minifiers/MinCleancss.vue')),
  csskit: asyncify(() => import('@/components/minifiers/MinCsskit.vue')),
  csso: asyncify(() => import('@/components/minifiers/MinCsso.vue')),
  esbuild: asyncify(() => import('@/components/minifiers/MinEsbuild.vue')),
  sass: asyncify(() => import('@/components/minifiers/MinSass.vue'))
};

const input = `
.foo {
  color: rebeccapurple;
}
.foo:hover {
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
}
`.trim();

export default {
  name: 'PlayGround',
  components: {
    MarkDownTable: asyncify(() => import('@/components/MarkdownTable.vue'))
  },
  data: function () {
    return {
      input,
      output: {},
      versions: {},
      shortestMinifiedLength: 0,
      winners: []
    };
  },
  methods: {
    initialize: function () {
      Object.keys(minifiers).forEach((key) => {
        this.output[key] = '';
        this.versions[key] = '';
      });
    },
    setWinners: function () {
      this.winners = [];
      if (
        this.shortestMinifiedLength &&
        !Object.values(this.output).includes('')
      ) {
        for (const key in this.output) {
          if (this.output[key].length === this.shortestMinifiedLength) {
            this.winners.push(key);
          }
        }
      }
    },
    setOutput: function (key, value) {
      this.output[key] = value;
      const values = Object.values(this.output);
      const lengths = values.map((value) => {
        return value.length;
      });
      this.shortestMinifiedLength = Math.min(...lengths);
      this.setWinners();
    },
    setVersion: function (key, value) {
      this.versions[key] = value;
    },
    urlEncode: function (data) {
      const buffer = strToU8(data);
      const zipped = zlibSync(buffer, { level: 9 });
      const binary = strFromU8(zipped, true);
      return btoa(binary);
    },
    urlDecode: function (base64) {
      const binary = atob(base64);
      if (binary.startsWith('\x78\xDA')) {
        const buffer = strToU8(binary, true);
        const unzipped = unzlibSync(buffer);
        return strFromU8(unzipped);
      }
      return decodeURIComponent(escape(binary));
    },
    setUrlParams: function () {
      let value = '';
      if (this.input) {
        value = this.urlEncode(this.input);
      }
      const url = new URL(window.location);
      url.searchParams.set('v', value);
      history.replaceState({}, '', url);
    },
    loadUrlParams: function () {
      const url = new URL(window.location);
      const value = url.searchParams.get('v');
      const input = url.searchParams.get('i');
      if (input?.length) {
        url.searchParams.delete('i');
        history.replaceState({}, '', url);
        this.input = input;
      } else if (value) {
        this.input = this.urlDecode(value);
      }
    }
  },
  computed: {
    minifiers: function () {
      return minifiers;
    }
  },
  watch: {
    input: function (value) {
      if (!value) {
        this.winners = [];
      }
      this.setUrlParams();
    }
  },
  created: function () {
    this.initialize();
    this.loadUrlParams();
  }
};
</script>

<style>
.playground-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 90%;
  margin: 10px auto;
}
.playground-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.playground-label {
  font-weight: bold;
}
.playground-input-container {
  background: var(--toolbar-background);
  border-radius: 0px 40px 40px;
  padding: 15px;
}
.playground-input {
  width: 100%;
  height: 152px;
  border: 0px;
  background: transparent;
  color: var(--color);
  resize: vertical;
  outline: 0px;
}
.playground-table tr > :nth-child(2) {
  padding: 0px 0px 0px 5px;
}
.playground-table td:nth-child(2) {
  color: var(--light-text);
}
</style>
