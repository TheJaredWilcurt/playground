import { formatMs } from '@/helpers/helpers.js';

import MinifierTemplate from '@/components/MinifierTemplate.vue';

export default {
  components: {
    MinifierTemplate
  },
  props: {
    input: {
      type: String,
      default: ''
    },
    winner: {
      type: Boolean,
      default: false
    }
  },
  emits: ['minified'],
  data: function () {
    return {
      output: '',
      duration: 0
    };
  },
  computed: {
    time: function () {
      return formatMs(this.duration);
    }
  },
  watch: {
    input: {
      handler: function () {
        this.minify();
      },
      immediate: true
    },
    output: {
      handler: function () {
        this.$emit('minified', this.output);
      },
      immediate: true
    }
  }
};
