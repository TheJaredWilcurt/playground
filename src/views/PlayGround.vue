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
        for="codemirror2"
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
      <CheckBox
        v-model="showExpected"
        label="Show Expected Output"
      />
      <CheckBox
        v-model="showErrors"
        label="Show Errors"
      />
      <CheckBox
        v-model="showTestDescription"
        label="Show Test Description"
      />
    </div>

    <TestDescription
      v-show="showTestDescription"
      v-model:category="testCategory"
      v-model:title="testTitle"
      v-model:description="testDescription"
      class="playground-form"
    />

    <MarkdownTable
      :input="input"
      :output="output"
      :versions="versions"
      :expected="expected"
      :showExpected="showExpected"
      :showTestDescription="showTestDescription"
      :testCategory="testCategory"
      :testTitle="testTitle"
      :testDescription="testDescription"
    />
  </div>
</template>

<script>
import { useUrlParams } from '@/composables/urlParams.js';

import { categories } from '@/helpers/categories.js';
import { asyncify } from '@/helpers/helpers.js';

const minifiers = {
  csslop: asyncify(() => import('@/components/minifiers/MinCsslop.vue')),
  lightning: asyncify(() => import('@/components/minifiers/MinLightning.vue')),
  cleancss: asyncify(() => import('@/components/minifiers/MinCleancss.vue')),
  cssnano: asyncify(() => import('@/components/minifiers/MinCssnano.vue')),
  csskit: asyncify(() => import('@/components/minifiers/MinCsskit.vue')),
  csso: asyncify(() => import('@/components/minifiers/MinCsso.vue')),
  esbuild: asyncify(() => import('@/components/minifiers/MinEsbuild.vue')),
  sass: asyncify(() => import('@/components/minifiers/MinSass.vue'))
};

const {
  input,
  expected,
  showExpected,
  showTestDescription,
  testCategory,
  testTitle,
  testDescription,
  setUrlParams,
  loadUrlParams
} = useUrlParams();

export default {
  name: 'PlayGround',
  components: {
    CheckBox: asyncify(() => import('@/components/CheckBox.vue')),
    CodeMirror: asyncify(() => import('@/components/CodeMirror.vue')),
    MarkdownTable: asyncify(() => import('@/components/MarkdownTable.vue')),
    TestDescription: asyncify(() => import('@/components/TestDescription.vue'))
  },
  data: function () {
    return {
      input,
      expected,
      showExpected,
      showTestDescription,
      testCategory,
      testTitle,
      testDescription,
      showErrors: false,
      output: {},
      versions: {},
      shortestMinifiedLength: 0,
      winners: []
    };
  },
  methods: {
    setUrlParams,
    loadUrlParams,
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
    },
    showExpected: function () {
      this.setWinners();
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
</style>
