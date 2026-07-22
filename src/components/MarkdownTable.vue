<template>
  <div class="markdown-table-container">
    <button
      class="markdown-table-label-button"
      @click="show = !show"
    >
      <label
        class="markdown-table-label"
        for="markdown-table"
      >
        Markdown table
        <span
          class="markdown-table-pointer"
          :class="{ 'markdown-table-pointer-rotate': show }"
        >
          ▶
        </span>
      </label>
    </button>
    <DoxenAccordion :show="show">
      <pre
        v-html="formatted"
        id="markdown-table"
        class="markdown-table-pre"
      ></pre>
      <div class="markdown-table-button-container">
        <transition name="markdown-table-fade">
          <span
            v-if="copied"
            class="markdown-table-copied"
          >
            Copied
          </span>
        </transition>
        <button
          class="markdown-table-button"
          @click="copy"
        >
          Copy
        </button>
      </div>
    </DoxenAccordion>
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/core';
import markdown from 'highlight.js/lib/languages/markdown';
import { DoxenAccordion } from 'vue-doxen';

hljs.registerLanguage('markdown', markdown);

export default {
  name: 'MarkdownTable',
  components: {
    DoxenAccordion
  },
  props: {
    output: {
      type: Object,
      required: true
    },
    versions: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      show: false,
      table: '',
      copied: false
    };
  },
  methods: {
    makeTable: function () {
      const longest = this.longest;
      const sizeLong = this.sizeLongest;
      const versionLong = this.versionLongest;
      let table = '';
      table = table + '\n* * *\n\n';
      table = table + '[CSS Minifier Playground](' + location.href + ')\n\n';
      table = table + [
        ('Minifier').padEnd(longest),
        ' | ',
        ('Version').padEnd(versionLong),
        ' | ',
        ('Size').padEnd(sizeLong),
        ' | Output\n'
      ].join('');
      table = table + [
        (':--').padEnd(longest),
        ' | ',
        (':--:').padEnd(versionLong),
        ' | ',
        (':--').padEnd(sizeLong),
        ' | :--\n'
      ].join('');
      for (const key in this.output) {
        const data = this.output?.[key] || '';
        const version = 'v' + (this.versions?.[key] || '?');
        table = [
          table,
          key.padEnd(longest),
          ' | ',
          version.padEnd(versionLong),
          ' | ',
          String(data.length).padEnd(sizeLong),
          ' | `',
          data.replaceAll('\n', '\\n'),
          '`\n'
        ].join('');
      }
      this.table = table;
    },
    copy: async function () {
      try {
        await navigator.clipboard.writeText(this.table);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1000);
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  computed: {
    formatted: function () {
      return hljs.highlight(this.table, { language: 'markdown' }).value;
    },
    longest: function () {
      const keys = Object.keys(this.output);
      const lengths = keys.map((key) => {
        return key.length;
      });
      return Math.max(...lengths);
    },
    sizeLongest: function () {
      const items = ['Size'];
      for (const key in this.output) {
        const size = String(this.output[key].length);
        items.push(size);
      }
      const lengths = items.map((item) => {
        return item.length;
      });
      return Math.max(...lengths);
    },
    versionLongest: function () {
      const items = ['Version'];
      for (const key in this.versions) {
        const version = String(this.versions[key].length);
        items.push(version);
      }
      const lengths = items.map((item) => {
        return item.length;
      });
      return Math.max(...lengths);
    }
  },
  watch: {
    output: {
      handler: function () {
        this.makeTable();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style>
.markdown-table-container {
  margin-top: 10px;
}
.markdown-table-label-button {
  background: transparent;
  border: 0px;
  color: currentcolor;
  cursor: pointer;
  &:hover,
  &:focus {
    background: transparent;
  }
  &:focus-visible {
    outline: 1px dotted currentcolor;
  }
}
.markdown-table-label {
  color: currentcolor;
  font-weight: bold;
  cursor: pointer;
}
.markdown-table-pointer {
  position: relative;
  display: inline-block;
  font-size: 10px;
  transform: translate(0px, -2px) rotate(0deg);
  transition: 750ms ease transform;
}
.markdown-table-pointer-rotate {
  transform: translate(0px, -1px) rotate(90deg);
}
.markdown-table-pre {
  max-width: 800px;
  max-height: 228px;
  overflow: auto;
}
.markdown-table-button-container {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin-top: 10px;
}
.markdown-table-copied {
  color: var(--light-text);
  font-style: italic;
}
.markdown-table-fade-leave-active {
  transition: 0.5s ease opacity;
}
.markdown-table-fade-enter-from,
.markdown-table-fade-leave-to {
  opacity: 0;
}
.markdown-table-button {
  display: flex;
  align-items: end;
  border: 0px;
  border-radius: 0px 8px 8px;
  margin: 0px;
  padding: 4px 6px 3px 20px;
  font-weight: bold;
  font-size: 21px;
  text-transform: uppercase;
  &:focus-visible {
    outline: 1px dotted currentcolor;
  }
}
</style>
