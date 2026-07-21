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
        v-text="table"
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
import { DoxenAccordion } from 'vue-doxen';

export default {
  name: 'MarkdownTable',
  components: {
    DoxenAccordion
  },
  props: {
    output: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      show: true,
      table: '',
      copied: false
    };
  },
  methods: {
    makeTable: function () {
      const longest = this.longest;
      const sizeLong = this.sizeLongest;
      let table = '';
      table = table + '\n* * *\n\n';
      table = table + '[CSS Minifier Playground](' + location.href + ')\n\n';
      table = table + ('Minifier').padEnd(longest) + ' | ' + ('Size').padEnd(sizeLong) + ' | Output\n';
      table = table + (':--').padEnd(longest) + ' | ' + (':--').padEnd(sizeLong) + ' | :--\n';
      for (const key in this.output) {
        table = [
          table,
          key.padEnd(longest),
          ' | ',
          String(this.output[key].length).padEnd(sizeLong),
          ' | `',
          this.output[key],
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
  font-weight: bold;
  cursor: pointer;
}
.markdown-table-pointer {
  position: relative;
  top: -2px;
  left: 0px;
  display: inline-block;
  font-size: 10px;
  transition: 750ms ease all;
}
.markdown-table-pointer-rotate {
  top: -1px;
  left: 2px;
  transform: rotate(90deg);
}
.markdown-table-pre {
  max-width: 800px;
  max-height: 200px;
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
}
</style>
