<template>
  <tr>
    <slot></slot>
    <td
      class="minifier-template-center"
      :title="'v' + (fullVersion || version)"
    >v{{ version }}</td>
    <td class="minifier-template-center-padded">{{ time }}</td>
    <td><pre class="minifier-template-pre"><code v-text="output"></code></pre></td>
    <td class="minifier-template-center">{{ output.length.toLocaleString() }}</td>
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
    }
  }
};
</script>

<style>
.minifier-template-center {
  text-align: center;
}
.minifier-template-center-padded {
  text-align: center;
  padding-left: 3px;
}
.minifier-template-pre {
  max-height: 120px;
}
</style>
