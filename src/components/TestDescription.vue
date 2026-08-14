<template>
  <form
    style="max-width: 650px"
    @submit.prevent
  >
    <label
      for="test-description-title"
      class="test-description-label"
    >
      Test Title
    </label>
    <CodeMirror
      v-model="innerTitle"
      id="test-description-title"
      class="test-description-input-container"
      language="md"
      style="--default-height: 25px"
    />

    <label
      for="test-description"
      class="test-description-label"
    >
      Test Description
    </label>
    <CodeMirror
      :modelValue="description"
      id="test-description"
      class="test-description-input-container"
      language="md"
      style="--default-height: calc(25px * 3)"
      @update:modelValue="$emit('update:description', $event)"
    />
  </form>
</template>

<script>
import { asyncify } from '@/helpers/helpers.js';

export default {
  name: 'TestDescription',
  components: {
    CodeMirror: asyncify(() => import('@/components/CodeMirror.vue'))
  },
  props: {
    description: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: [
    'update:description',
    'update:title'
  ],
  data: function () {
    return {
      innerTitle: ''
    };
  },
  computed: {
    testTitle: function () {
      let title = this.innerTitle || '';
      title = title.trim();

      const firstWord = title.split(' ')[0];
      const markdownHeadings = [
        '#',
        '##',
        '###',
        '####',
        '#####',
        '######'
      ];
      /**
       * Detect if any words START with ANY amount of pound signs followed
       * directly by a letter (not a space). Then split on them. If the first
       * item in the array is an empty string, then the first word had a
       * pound sign(s) touching it.
       *
       * Finds:
       * '#My example'
       * '#####Another example'
       * '##test'
       *
       * Does not find:
       * 'Ensures `#` in ID is...'
       * 'Some#Text'
       * 'My ###Words'
       *
       * @type {string}
       */
      const firstWordIsJoinedHeading = firstWord.split(/#+\w/)[0] === '';

      if (markdownHeadings.includes(firstWord)) {
        // Remove heading
        title = title
          .split(' ')
          .slice(1)
          .join(' ');
      } else if (firstWordIsJoinedHeading) {
        let titleWords = title.split(' ');
        while (titleWords[0].startsWith('#')) {
          titleWords[0] = titleWords[0].replace('#', '');
        }
        title = titleWords.join(' ');
      }

      return '# ' + title;
    }
  },
  watch: {
    title: function (value) {
      this.innerTitle = value;
    },
    testTitle: function (value) {
      this.$emit('update:title', value);
    }
  },
  created: function () {
    if (this.title?.startsWith('# ')) {
      this.innerTitle = this.title.replace('# ', '');
    } else if (this.title) {
      this.innerTitle = this.title;
    }
  }
};
</script>

<style>
.test-description-label {
  margin-top: 10px;
  font-weight: bold;
}
.test-description-title {
  background: var(--toolbar-background);
  border: 0px;
  border-radius: 0px 40px 40px;
  padding: 15px;
}
.test-description-input-container {
  background: var(--toolbar-background);
  border-radius: 0px 40px 40px;
  padding: 15px;
}
</style>
