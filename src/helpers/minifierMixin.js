export default {
  props: {
    input: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      output: ''
    };
  },
  watch: {
    input: {
      handler: function () {
        this.minify();
      },
      immediate: true
    }
  }
};
