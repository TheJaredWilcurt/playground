<template>
  <tr>
    <td>
      <div class="min-csso-logo">
        <span>CSSO</span>
      </div>
    </td>
    <td>v{{ version }}</td>
    <td><pre><code v-text="output"></code></pre></td>
  </tr>
</template>

<script>
import { minify, version } from 'csso';

export default {
  name: 'MinCsso',
  props: {
    input: {
      type: String,
      default: ''
    }
  },
  constants: {
    version
  },
  computed: {
    output: function () {
      const options = {
        restructure: true,
        sourceMap: false
      };
      return minify(this.input, options).css;
    }
  }
};
</script>

<style>
.min-csso-logo {
  display: flex;
  align-items: end;
  justify-content: end;
  width: 30px;
  height: 30px;
  background: rebeccapurple;
  border-radius: 0px 8px 8px;
  margin: 0px auto;
  padding: 0px 3px 2px 0px;
  color: #FFF;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  span {
    text-rendering: geometricprecision;
    transform: scaleY(1.1) translateY(-1px);
  }
}
</style>
