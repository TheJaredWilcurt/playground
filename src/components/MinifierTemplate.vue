<template>
  <tr>
    <slot></slot>
    <td
      class="minifier-template-center"
      :title="'v' + (fullVersion || version)"
    >v{{ version }}</td>
    <td class="minifier-template-center">{{ time }}</td>
    <td><pre class="minifier-template-pre"><code v-text="output"></code></pre></td>
    <td class="minifier-template-center">
      {{ output.length.toLocaleString() }}
    </td>
    <td>
      <div
        v-if="winner"
        class="minifier-template-checkmark-container"
      >
        <div class="minifier-template-checkmark"></div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'MinifierTemplate',
  props: {
    fullVersion: {
      type: String,
      default: undefined
    },
    version: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    winner: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.minifier-template-center {
  text-align: center;
}
.minifier-template-pre {
  max-height: 120px;
}
.minifier-template-checkmark-container {
  position: relative;
  width: 32px;
  height: 23px;
}
.minifier-template-checkmark {
  transform: scale(0.6) translate(-12px, 32px);
}
.minifier-template-checkmark:before,
.minifier-template-checkmark:after {
  content: '';
  position: absolute;
  display: block;
  background: var(--checkmark);
}
.minifier-template-checkmark:before {
  bottom: 0px;
  left: 5px;
  width: 5px;
  height: 15px;
  transform: rotate(-45deg);
  border-radius: 20px 0px 0px 20px;
}
.minifier-template-checkmark:after {
  bottom: 0px;
  left: 16px;
  width: 5px;
  height: 26px;
  transform: rotate(37deg);
  border-radius: 10px 10px 20px 0px;
}
</style>
