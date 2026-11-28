<template>
  <div>
    <div class="playground-label expected-input-label">
      <span>
        <label :for="forId">
          {{ label }}
        </label>
        <span class="playground-length">
          (<strong>Length:</strong>
          {{ expected.length.toLocaleString() }}<span
            v-if="showGZip"
            class="playground-gzip"
          >
            <strong>GZip:</strong>
            {{ expectedGZip }}
          </span>)
        </span>
      </span>
      <span>
        <slot />
      </span>
    </div>
    <CodeMirror
      :id="forId"
      :modelValue="expected"
      class="playground-input-container"
      style="--default-height: 25px"
      @update:model-value="$emit('setWinners', $event)"
    />
  </div>
</template>

<script>
import { asyncify } from '@/helpers/helpers.js';

export default {
  name: 'ExpectedInput',
  components: {
    CodeMirror: asyncify(() => import('@/components/CodeMirror.vue'))
  },
  props: {
    label: {
      type: String,
      required: true
    },
    forId: {
      type: String,
      required: true
    },
    showGZip: {
      type: Boolean,
      default: false
    },
    expected: {
      type: String,
      default: ''
    },
    expectedGZip: {
      type: Number,
      default: 20
    }
  },
  emits: [
    'decrementExpectationAmount',
    'incrementExpectationAmount',
    'setWinners'
  ]
};
</script>

<style>
.expected-input-label {
  display: flex;
  justify-content: space-between;
}
</style>
