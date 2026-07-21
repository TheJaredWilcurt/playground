<template>
  <MinifierTemplate
    :version="version"
    :output="output"
    :time="time"
  >
    <td>
      <a
        class="min-csso-logo"
        href="https://css.github.io/csso/csso.html"
        title="CSS Optimizer"
      >
        <span>CSSO</span>
      </a>
    </td>
  </MinifierTemplate>
</template>

<script>
import { minify, version } from 'csso';

import minifierMixin from '@/helpers/minifierMixin.js';

export default {
  name: 'MinCsso',
  mixins: [minifierMixin],
  constants: {
    version
  },
  methods: {
    minify: function () {
      let start = new Date();
      try {
        const options = {
          restructure: true,
          sourceMap: false
        };
        this.output = minify(this.input, options).css;
      } catch {
        /**/
      }
      let end = new Date();
      this.duration = end - start;
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
  text-decoration: none;
  text-transform: uppercase;
  span {
    text-rendering: geometricprecision;
    transform: scaleY(1.1) translateY(-1px);
  }
}
</style>
