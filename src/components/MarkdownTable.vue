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
        <template v-if="showTestDescription">
          Issue template
        </template>
        <template v-else>
          Markdown table
        </template>
        <span
          class="markdown-table-pointer"
          :class="{ 'markdown-table-pointer-rotate': show }"
        >
          ▶
        </span>
      </label>
    </button>
    <DoxenAccordion :show="show">
      <div class="markdown-table-pre-container">
        <MarkdownHighlighter
          class="markdown-table-pre"
          :input="allMarkdown"
        />
      </div>
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
        <a
          v-if="showTestDescription"
          class="markdown-table-link"
          :href="issueLink"
          target="_blank"
        >
          Create Issue
        </a>
      </div>
    </DoxenAccordion>
  </div>
</template>

<script>
import { DoxenAccordion } from 'vue-doxen';

import MarkdownHighlighter from '@/components/MarkdownHighlighter.vue';

const VERSION = 'Version';
const SIZE = 'Size';

export default {
  name: 'MarkdownTable',
  components: {
    DoxenAccordion,
    MarkdownHighlighter
  },
  props: {
    input: {
      type: String,
      default: ''
    },
    output: {
      type: Object,
      required: true
    },
    versions: {
      type: Object,
      required: true
    },
    expected: {
      type: String,
      default: ''
    },
    showExpected: {
      type: Boolean,
      default: false
    },
    showTestDescription: {
      type: Boolean,
      default: false
    },
    testCategory: {
      type: String,
      default: ''
    },
    testTitle: {
      type: String,
      default: ''
    },
    testDescription: {
      type: String,
      default: ''
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
      const link = location.href
        .replace('http://localhost:4173', 'https://TheJaredWilcurt.com')
        .replace('http://localhost:5173', 'https://TheJaredWilcurt.com');
      let table = '';
      table = table + '[CSS Minifier Playground](' + link + ')\n\n';
      table = table + [
        ('Minifier').padEnd(longest),
        ' | ',
        (VERSION).padEnd(versionLong),
        ' | 🏆  | ',
        (SIZE).padEnd(sizeLong),
        ' | Output\n'
      ].join('');
      table = table + [
        (':--').padEnd(longest),
        ' | ',
        (':--:').padEnd(versionLong),
        ' | :-- | ',
        (':--').padEnd(sizeLong),
        ' | :--\n'
      ].join('');
      for (const key in this.output) {
        const data = this.output?.[key] || '';
        const version = 'v' + (this.versions?.[key] || '?');
        let trophy = '   ';
        if (
          (this.showExpected && data === this.expected?.trim()) ||
          (!this.showExpected && data.length === this.smallest)
        ) {
          trophy = '🏆 ';
        }
        table = [
          table,
          key.padEnd(longest),
          ' | ',
          version.padEnd(versionLong),
          ' | ',
          trophy,
          ' | ',
          String(data.length).padEnd(sizeLong),
          ' | ',
          (data.trim()) ? '`' + data.replaceAll('\n', '\\n').replaceAll('|', '\\|') + '`' : '',
          '\n'
        ].join('');
      }
      this.table = table;
    },
    copy: async function () {
      try {
        await navigator.clipboard.writeText(this.allMarkdown);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1000);
      } catch (error) {
        console.error(error.message);
      }
    },
    wrapInCssCodeFence: function (value) {
      return [
        '```css',
        value,
        '```'
      ].join('\n');
    },
    wrapInMarkdownCodeFence: function (value) {
      return [
        '```md',
        value,
        '```'
      ].join('\n');
    }
  },
  computed: {
    allMarkdown: function () {
      let markdown = [];
      if (this.testCategory) {
        const category = '`' + this.testCategory + '/00xx`\n';
        markdown.push(category);
      }
      if (this.showTestDescription) {
        const description = this.wrapInMarkdownCodeFence([
          this.testTitle,
          this.testDescription
        ].join('\n\n'));
        markdown.push(description);
      }
      const input = this.wrapInCssCodeFence(this.input);
      markdown.push(input);
      if (this.showExpected) {
        const expected = this.wrapInCssCodeFence(this.expected);
        markdown.push(expected);
      }
      markdown.push(this.table);
      return markdown.join('\n\n');
    },
    issueLink: function () {
      const title = 'Test: ' + this.testTitle.replace('# ', '');
      const body = this.allMarkdown;
      return [
        'https://github.com/keithamus/css-minify-tests/issues/new',
        '?title=' + encodeURIComponent(title),
        '&body=' + encodeURIComponent(body)
      ].join('');
    },
    longest: function () {
      const keys = Object.keys(this.output);
      const lengths = keys.map((key) => {
        return key.length;
      });
      return Math.max(...lengths);
    },
    smallest: function () {
      let smallest = Infinity;
      for (const key in this.output) {
        const length = this.output[key]?.length;
        if (length) {
          smallest = Math.min(smallest, length);
        }
      }
      return smallest;
    },
    sizeLongest: function () {
      const items = [SIZE];
      for (const key in this.output) {
        const size = String(this.output[key]?.length || 0);
        items.push(size);
      }
      const lengths = items.map((item) => {
        return item.length;
      });
      return Math.max(...lengths);
    },
    versionLongest: function () {
      const items = [VERSION];
      for (const key in this.versions) {
        const version = this.versions[key] || '';
        items.push(version);
      }
      const v = 'v';
      const lengths = items.map((item) => {
        return v.length + item.length;
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
    },
    expected: {
      handler: function () {
        this.makeTable();
      },
      immediate: true
    },
    showExpected: {
      handler: function () {
        this.makeTable();
      },
      immediate: true
    }
  },
  created: function () {
    if (this.showTestDescription) {
      this.show = true;
    }
  }
};
</script>

<style>
.markdown-table-container {
  margin-top: 10px;
}
.markdown-table-label-button {
  width: 100%;
  background: transparent;
  border: 0px;
  color: currentcolor;
  text-align: left;
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
.markdown-table-pre-container {
  background: var(--toolbar-background);
  border-radius: 0px 23px 23px;
  padding: 20px 0px;
}
.markdown-table-pre {
  background: transparent;
  max-width: 650px;
  max-height: 250px;
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
.markdown-table-button,
.markdown-table-link {
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
.markdown-table-link {
  background: var(--button-bg);
  color: var(--button-fg);
  text-decoration: none;
  &:focus,
  &:hover {
    background: var(--button-hover);
  }
}
</style>
