<template>
  <div id="codemirror" class="code-mirror-playground"></div>
</template>

<script>
import { acceptCompletion } from '@codemirror/autocomplete';
import { css as codeMirrorCss } from '@codemirror/lang-css';
import { keymap } from '@codemirror/view';
import {
  basicSetup,
  EditorView
} from 'codemirror';

export default {
  name: 'CodeMirror',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    initializeCodeMirror: function () {
      this.mirror = new EditorView({
        doc: this.modelValue,
        extensions: [
          basicSetup,
          codeMirrorCss(),
          keymap.of([
            {
              key: 'Tab',
              run: acceptCompletion
            }
          ]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              this.$emit('update:modelValue', this.mirror.state.doc.toString());
            }
          })
        ]
      });
      const parent = document.getElementById('codemirror');
      parent.insertBefore(this.mirror.dom, parent.firstChild);
    }
  },
  mounted: function () {
    this.initializeCodeMirror();
  }
};
</script>

<style>
#codemirror.code-mirror-playground {
  .cm-editor {
    background: var(--toolbar-background);
    border-radius: 10px;
  }
  .cm-focused { outline: none; }
  .cm-cursor { border-color: #000; }
  .cm-gutters { background: var(--background); }
  .cm-activeLineGutter { background: var(--light-text); }
  .cm-activeLine { background-color: #CCEEFF87; }
  .cm-scroller { border-radius: 10px; }
  .hljs { background: var(--background); }
  ::selection,
  ::-moz-selection {
      background: var(--light-text) !important;
      color: #FFF;
      text-shadow: none;
  }
  .cm-cursor { border-color: #FFF; }
  .cm-gutters {
    background: var(--code-mirror-gutter);
    color: var(--light-text);
  }
  .cm-content { background: var(--toolbar-background); }
  .cm-gutters { border-color: var(--background); }
  .cm-tooltip,
  .cm-activeLineGutter { background: var(--background); }
  .cm-activeLine { background-color: var(--code-mirror-gutter); }
  .cm-specialChar { color: var(--hljs-number); }
  .\00037Cb { color: var(--hljs-number-darker); }
  .\00037Cc { color: var(--light-text); }
  .\00037Cd { color: var(--hljs-number); }
  .\00037Ce { color: var(--hljs-number); }
  .\00037Cf { color: inherit; }
  .\00037Cg { color: inherit; }
  .\00037Ch { color: inherit; }
  .\00037Ci { color: var(--hljs-tag); }
  .\00037Cj { color: var(--light-text); }
  .\00037Ck { color: inherit; }
  .\00037Cl { color: inherit; }
  .\00037Cm { color: var(--hljs-comment); font-style: italic; }
  .\00037Cn { color: inherit; }
}
</style>
