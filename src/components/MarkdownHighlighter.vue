<template>
  <div v-html="code"></div>
</template>

<script>
/* eslint-disable import-x/extensions */
import {
  createCssVariablesTheme,
  createHighlighterCore
} from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

const myTheme = createCssVariablesTheme({
  displayName: 'My Theme',
  name: 'my-theme',
  semanticHighlighting: true,
  type: 'dark'
});

const highlighter = await createHighlighterCore({
  themes: [
    myTheme
  ],
  langs: [
    import('@shikijs/langs/css'),
    import('@shikijs/langs/markdown')
  ],
  engine: createOnigurumaEngine(import('shiki/wasm'))
});

export default {
  name: 'MarkdownHighlighter',
  props: {
    input: {
      type: String,
      default: ''
    }
  },
  computed: {
    code: function () {
      return highlighter.codeToHtml(this.input, {
        lang: 'markdown',
        theme: 'my-theme'
      });
    }
  }
};
</script>
