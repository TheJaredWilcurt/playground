<template>
  <div class="playground-container">
    <form
      class="playground-form"
      @submit.prevent
    >
      <label
        for="codemirror"
        class="playground-label"
      >
        Input ({{ input.length.toLocaleString() }})
      </label>
      <CodeMirror
        v-model="input"
        id="codemirror"
        class="playground-input-container"
        style="--default-height: 153px"
      />
      <label
        v-if="showExpected"
        for="codemirror"
        class="playground-label"
      >
        Expected Output ({{ expected.length.toLocaleString() }})
      </label>
      <CodeMirror
        v-if="showExpected"
        v-model="expected"
        id="codemirror2"
        class="playground-input-container"
        style="--default-height: 25px"
        @update:model-value="setWinners"
      />
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
          :showErrors="showErrors"
          :showExpected="showExpected"
          :winner="winners.includes(key)"
          @minified="setOutput(key, $event)"
          @version="setVersion(key, $event)"
          :key="key"
        />
      </tbody>
    </table>

    <div class="playground-controls">
      <label>
        <input
          v-model="showExpected"
          class="playground-checkbox"
          type="checkbox"
        />
        Show Expected Output
      </label>

      <label>
        <input
          v-model="showErrors"
          class="playground-checkbox"
          type="checkbox"
        />
        Show Errors
      </label>
    </div>

    <MarkDownTable
      :output="output"
      :versions="versions"
      :expected="expected"
      :showExpected="showExpected"
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
    CodeMirror: asyncify(() => import('@/components/CodeMirror.vue')),
    MarkDownTable: asyncify(() => import('@/components/MarkdownTable.vue'))
  },
  data: function () {
    return {
      input,
      showExpected: false,
      showErrors: false,
      expected: '',
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
      if (this.shortestMinifiedLength) {
        for (const key in this.output) {
          if (this.showExpected) {
            if (this.expected.trim() === this.output[key]) {
              this.winners.push(key);
            }
          } else if (this.output[key]?.length === this.shortestMinifiedLength) {
            this.winners.push(key);
          }
        }
      }
    },
    setOutput: function (key, value) {
      this.output[key] = value;
      const values = Object.values(this.output);
      const lengths = values
        .filter(Boolean)
        .map((value) => {
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
      const url = new URL(window.location);
      let value = '';
      if (this.input) {
        value = this.urlEncode(this.input);
      }
      if (this.showExpected) {
        url.searchParams.set('x', this.urlEncode(this.expected));
      } else {
        url.searchParams.delete('x');
      }
      url.searchParams.set('v', value);
      history.replaceState({}, '', url);
    },
    loadUrlParams: function () {
      const url = new URL(window.location);
      const value = url.searchParams.get('v');
      const input = url.searchParams.get('i');
      const expected = url.searchParams.get('e');
      const expectation = url.searchParams.get('x');
      if (typeof(expected) === 'string') {
        url.searchParams.delete('e');
        history.replaceState({}, '', url);
        this.showExpected = true;
        this.expected = expected;
      } else if (typeof(expectation) === 'string') {
        this.showExpected = true;
        this.expected = this.urlDecode(expectation);
      }
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
    },
    showExpected: function () {
      this.setWinners();
      this.setUrlParams();
    },
    expected: function () {
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
  margin: 10px 0px 40px;
}
.playground-label {
  margin-top: 10px;
  font-weight: bold;
}
.playground-input-container {
  background: var(--toolbar-background);
  border-radius: 0px 40px 40px;
  padding: 15px;
}
.playground-table tr > :nth-child(2) {
  padding: 0px 0px 0px 5px;
}
.playground-table td:nth-child(2) {
  color: var(--light-text);
}
.playground-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  color: var(--light-text);
}
.playground-checkbox {
  appearance: none;
  width: 15px;
  height: 15px;
  border: 2px solid rebeccapurple;
  background: var(--toolbar-background);
  border-radius: 0px 5px 5px;
  vertical-align: text-bottom;
}
.playground-checkbox:checked {
  background: rebeccapurple;
}
</style>
