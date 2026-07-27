import {
  extractError,
  formatMs
} from '@/helpers/helpers.js';

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
    showErrors: {
      type: Boolean,
      default: false
    },
    showExpected: {
      type: Boolean,
      default: false
    },
    winner: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'minified',
    'version'
  ],
  data: function () {
    return {
      loading: true,
      output: '',
      duration: 0
    };
  },
  methods: {
    errorCatcher: function (error) {
      if (this.showErrors) {
        this.output = extractError(error);
      }
    }
  },
  computed: {
    time: function () {
      return formatMs(this.duration);
    },
    minifierTemplateProps: function () {
      return {
        fullVersion: this.fullVersion,
        version: this.version,
        output: this.output,
        showExpected: this.showExpected,
        loading: this.loading,
        time: this.time,
        winner: this.winner
      };
    }
  },
  watch: {
    showErrors: {
      handler: function () {
        this.output = '';
        this.minify();
      },
      immediate: true
    },
    showExpected: {
      handler: function () {
        this.minify();
      },
      immediate: true
    },
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
    },
    version: {
      handler: function () {
        this.$emit('version', this.version);
      },
      immediate: true
    }
  }
};
