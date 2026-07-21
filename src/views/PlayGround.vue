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
        <MinCsslop :input="input" />
        <MinLightning :input="input" />
        <MinCssnano :input="input" />
        <MinCleancss :input="input" />
        <MinCsskit :input="input" />
        <MinCsso :input="input" />
        <MinSass :input="input" />
      </tbody>
    </table>
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
    MinCleancss: asyncify(() => import('@/components/minifiers/MinCleancss.vue')),
    MinCsskit: asyncify(() => import('@/components/minifiers/MinCsskit.vue')),
    MinCsslop: asyncify(() => import('@/components/minifiers/MinCsslop.vue')),
    MinCssnano: asyncify(() => import('@/components/minifiers/MinCssnano.vue')),
    MinCsso: asyncify(() => import('@/components/minifiers/MinCsso.vue')),
    MinLightning: asyncify(() => import('@/components/minifiers/MinLightning.vue')),
    MinSass: asyncify(() => import('@/components/minifiers/MinSass.vue'))
  },
  data: function () {
    return {
      input
    };
  },
  methods: {
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
      if (value) {
        this.input = this.urlDecode(value);
      }
    }
  },
  watch: {
    input: function () {
      this.setUrlParams();
    }
  },
  created: function () {
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
