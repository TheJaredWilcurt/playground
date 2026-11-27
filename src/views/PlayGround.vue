<template>
  <div class="playground-container">
    <form
      class="playground-form"
      @submit.prevent
    >
      <div class="playground-label">
        <label for="codemirror">
          Input
        </label>
        <span class="playground-length">
          (<strong>Length:</strong>
          {{ input.length.toLocaleString() }}<span
            v-if="showGZip"
            class="playground-gzip"
          >
            <strong>GZip:</strong>
            {{ inputGZip }}
          </span>)
        </span>
      </div>
      <CodeMirror
        v-model="input"
        id="codemirror"
        class="playground-input-container"
        style="--default-height: 153px"
      />
      <ExpectedInput
        v-if="showExpected"
        label="Expected Output"
        forId="codemirror2"
        :showGZip="showGZip"
        :expected="expected"
        :expectedGZip="expectedGZip"
        @setWinners="expected = $event;setWinners()"
      >
        <button
          v-if="!showAlt1"
          class="playground-stepper"
          @click="showAlt1 = true;setWinners()"
        >+</button>
      </ExpectedInput>
      <ExpectedInput
        v-if="showExpected && showAlt1"
        label="Also Accepted"
        forId="codemirror3"
        :showGZip="showGZip"
        :expected="alt1"
        :expectedGZip="alt1GZip"
        @setWinners="alt1 = $event;setWinners()"
      >
        <button
          class="playground-stepper"
          @click="showAlt1 = false;setWinners()"
        >-</button>
      </ExpectedInput>
    </form>

    <table class="playground-table">
      <thead>
        <tr>
          <th>Minifier</th>
          <th>Version</th>
          <th>Time</th>
          <th>Output</th>
          <th>Length</th>
          <th v-if="showGZip" title="The length of the minified output after being gzipped">GZipped</th>
        </tr>
      </thead>
      <tbody>
        <Component
          v-for="(minifier, key) in minifiers"
          :is="minifier"
          :input="input"
          :expected="expected"
          :showDiffs="showDiffs"
          :showErrors="showErrors"
          :showExpected="showExpected"
          :showGZip="showGZip"
          :gZipLength="gZips[key]"
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
        v-model="showDiffs"
        label="Show Diffs"
      />
      <CheckBox
        v-model="showGZip"
        label="Show GZipped Sizes"
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
      :alt1="alt1"
      :showExpected="showExpected"
      :showAlt1="showAlt1"
      :showTestDescription="showTestDescription"
      :testCategory="testCategory"
      :testTitle="testTitle"
      :testDescription="testDescription"
    />
  </div>
</template>

<script>
import { useUrlParams } from '@/composables/urlParams.js';

import {
  asyncify,
  getGzippedSize
} from '@/helpers/helpers.js';

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
  alt1,
  showDiffs,
  showExpected,
  showAlt1,
  showGZip,
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
    ExpectedInput: asyncify(() => import('@/components/ExpectedInput.vue')),
    MarkdownTable: asyncify(() => import('@/components/MarkdownTable.vue')),
    TestDescription: asyncify(() => import('@/components/TestDescription.vue'))
  },
  data: function () {
    return {
      input,
      expected,
      alt1,
      showExpected,
      showAlt1,
      showGZip,
      showTestDescription,
      testCategory,
      testTitle,
      testDescription,
      showDiffs,
      showErrors: false,
      expectedGZip: 20,
      alt1GZip: 20,
      inputGZip: 20,
      gZips: {},
      output: {},
      versions: {},
      shortestMinifiedLength: 0,
      shortestZippedLength: 0,
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
      if (this.shortestMinifiedLength || this.shortestZippedLength) {
        for (const key in this.output) {
          if (this.showExpected) {
            if (this.expected.trim() === this.output[key]) {
              this.winners.push(key);
            }
            if (this.showAlt1 && this.alt1.trim() === this.output[key]) {
              this.winners.push(key);
            }
          } else if (this.showGZip) {
            if (this.gZips[key] === this.shortestZippedLength) {
              this.winners.push(key);
            }
          } else if (this.output[key]?.length === this.shortestMinifiedLength) {
            this.winners.push(key);
          }
        }
      }
    },
    setOutput: async function (key, value) {
      this.output[key] = value;
      const lengths = Object
        .values(this.output)
        .filter(Boolean)
        .map((value) => {
          return value.length;
        });
      this.shortestMinifiedLength = Math.min(...lengths);

      const defaultGzipOverheadOnEmptyString = 20;
      this.gZips[key] = await getGzippedSize(value);
      const zipLengths = Object
        .values(this.gZips)
        .filter(Boolean)
        .filter((length) => {
          return length > defaultGzipOverheadOnEmptyString;
        });
      this.shortestZippedLength = Math.min(...zipLengths);

      this.setWinners();
    },
    setVersion: function (key, value) {
      this.versions[key] = value;
    },
    setInputGzip: async function () {
      this.inputGZip = await getGzippedSize(this.input);
    },
    setExpectedGzip: async function () {
      this.expectedGZip = await getGzippedSize(this.expected);
    },
    setAlt1Gzip: async function () {
      this.alt1GZip = await getGzippedSize(this.alt1);
    }
  },
  computed: {
    minifiers: function () {
      return minifiers;
    }
  },
  watch: {
    expected: function () {
      this.setExpectedGzip();
    },
    alt1: function () {
      this.setAlt1Gzip();
    },
    input: function (value) {
      this.setInputGzip();
      if (!value) {
        this.winners = [];
      }
    },
    showExpected: function () {
      this.setWinners();
    },
    showGZip: function () {
      this.setWinners();
    }
  },
  created: function () {
    this.initialize();
    this.loadUrlParams();
    this.setInputGzip();
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
  label {
    font-weight: bold;
  }
}
.playground-length {
  color: var(--light-text);
  font-size: 14px;
  vertical-align: mathematical;
  strong {
    color: var(--hljs-comment);
    font-weight: normal;
  }
}
.playground-gzip {
  border-left: 1px solid currentcolor;
  margin: 0rem 0rem 0rem 0.5rem;
  padding: 0rem 0rem 0rem 0.5rem;
}
.playground-input-container {
  background: var(--toolbar-background);
  border-radius: 0px 40px 40px;
  padding: 15px;
}
.playground-stepper {
  height: 16px;
  border: 0px;
  border-radius: 0px 8px 8px 8px;
  padding: 0px 8px 0px 8px;
  line-height: 10px;
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
