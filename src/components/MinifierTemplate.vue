<template>
  <tr>
    <slot></slot>
    <td
      class="minifier-template-center"
      :title="'v' + (fullVersion || version)"
    >v{{ version }}</td>

    <td class="minifier-template-center">{{ time }}</td>

    <td
      v-if="loading"
      class="minifier-template-center"
    >
      <LoadingDots />
    </td>
    <td v-else>
      <pre
        class="minifier-template-pre"
        :class="{ 'minifier-template-pre-diff': showDiffs }"
      ><code v-html="formatted"></code></pre>
    </td>

    <td class="minifier-template-center">
      {{ output.length.toLocaleString() }}
    </td>

    <td>
      <div
        v-if="winner"
        class="minifier-template-checkmark-container"
        :title="showExpected ? 'Matches expectation' : 'Shortest non-zero output'"
      >
        <div class="minifier-template-checkmark"></div>
      </div>
    </td>
  </tr>
</template>

<script>
/* eslint-disable import-x/extensions */
import { diffChars } from 'diff';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';

import LoadingDots from '@/components/LoadingDots.vue';

hljs.registerLanguage('css', css);

export default {
  name: 'MinifierTemplate',
  components: {
    LoadingDots
  },
  props: {
    fullVersion: {
      type: String,
      default: undefined
    },
    version: {
      type: String,
      required: true
    },
    input: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    },
    expected: {
      type: String,
      required: true
    },
    showDiffs: {
      type: Boolean,
      required: true
    },
    showExpected: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    time: {
      type: String,
      required: true
    },
    winner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formatted: function () {
      const options = {
        language: 'css'
      };

      if (this.showDiffs) {
        let base = this.input.replaceAll('\n', '');
        let compare = this.output;
        if (this.showExpected) {
          base = this.output;
          compare = this.expected;
        }
        return diffChars(base, compare)
          .map((token) => {
            let span = '<span>';
            if (token.added) {
              span = '<span class="minifier-template-diff-added">';
            } else if (token.removed) {
              span = '<span class="minifier-template-diff-removed">';
            }
            return span + hljs.highlight(token.value, options).value + '</span>';
          })
          .join('');
      }

      return hljs.highlight(this.output, options).value;
    }
  }
};
</script>

<style>
.minifier-template-center {
  text-align: center;
}
.minifier-template-pre {
  max-height: 120px;
}
.minifier-template-pre-diff {
  line-height: 1.44;
}
.minifier-template-checkmark-container {
  position: relative;
  width: 16px;
  height: 23px;
}
.minifier-template-checkmark {
  transform: scale(0.6) translate(-7px, 32px);
}
.minifier-template-checkmark:before,
.minifier-template-checkmark:after {
  content: '';
  position: absolute;
  display: block;
  background: var(--checkmark);
}
.minifier-template-checkmark:before {
  bottom: 0px;
  left: 5px;
  width: 5px;
  height: 15px;
  transform: rotate(-45deg);
  border-radius: 20px 0px 0px 20px;
}
.minifier-template-checkmark:after {
  bottom: 0px;
  left: 16px;
  width: 5px;
  height: 26px;
  transform: rotate(37deg);
  border-radius: 10px 10px 20px 0px;
}
.minifier-template-diff-added {
  background: var(--diff-added);
  border-top: 1px solid var(--diff-added-border);
}
.minifier-template-diff-removed {
  background: var(--diff-removed);
  border-bottom: 1px solid var(--diff-removed-border);
}
</style>
