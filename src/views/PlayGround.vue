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
        Input
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
          <th>Output</th>
        </tr>
      </thead>
      <tbody>
        <MinCleancss :input="input" />
        <MinCsslop :input="input" />
        <MinCsso :input="input" />
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

import MinCleancss from '@/components/minifiers/MinCleancss.vue';
import MinCsslop from '@/components/minifiers/MinCsslop.vue';
import MinCsso from '@/components/minifiers/MinCsso.vue';

export default {
  name: 'PlayGround',
  components: {
    MinCleancss,
    MinCsslop,
    MinCsso
  },
  data: function () {
    return {
      input: 'a {\n  color: rebeccapurple;\n}\n'
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
      const value = url.searchParams.get('v')
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
  height: 150px;
  border: 0px;
  background: transparent;
  color: var(--color);
  resize: vertical;
  outline: 0px;
}
.playground-table tr > :nth-child(2) {
  text-align: center;
  padding: 0px 0px 0px 5px;
}
.playground-table td:nth-child(2) {
  color: var(--light-text);
}
</style>
