<template>
  <MinifierTemplate
    :version="version"
    :output="output"
    :time="time"
    :winner="winner"
  >
    <td class="min-lightning-logo-td">
      <a
        class="min-lightning-link"
        href="https://LightningCSS.dev/playground"
        title="Lightning CSS"
      >
        <svg
          class="min-lightning-logo"
          viewBox="495 168 360 654"
        >
          <path
            class="min-lightning-outer"
            d="M594.41 805c-.71 0-1.43-.15-2.11-.47a5.015 5.015 0 0 1-2.72-5.83l67.98-253.71H517.11a5.03 5.03 0 0 1-4.44-2.69c-.86-1.65-.73-3.65.34-5.18l26.85-38.35q25.56-36.51 104.91-149.83l106.31-151.82a4.99 4.99 0 0 1 6.21-1.66 5.015 5.015 0 0 1 2.72 5.83L692.03 455h140.45c1.86 0 3.57 1.04 4.43 2.69s.73 3.65-.34 5.18l-238.07 340a5 5 0 0 1-4.1 2.13Zm-67.69-270h137.37c1.55 0 3.02.72 3.97 1.96.95 1.23 1.27 2.84.86 4.34l-62.33 232.61 216.29-308.9H685.52c-1.55 0-3.02-.72-3.97-1.96a4.97 4.97 0 0 1-.86-4.34l62.33-232.61-90.04 128.59q-79.35 113.32-104.91 149.83L526.73 535Z"
          />
          <path
            class="min-lightning-inner"
            d="M594.41 805c-.71 0-1.43-.15-2.11-.47a5.015 5.015 0 0 1-2.72-5.83l67.98-253.71H517.11a5.03 5.03 0 0 1-4.44-2.69c-.86-1.65-.73-3.65.34-5.18l26.85-38.35q25.56-36.51 104.91-149.83l106.31-151.82a4.99 4.99 0 0 1 6.21-1.66 5.015 5.015 0 0 1 2.72 5.83L692.03 455h140.45c1.86 0 3.57 1.04 4.43 2.69s.73 3.65-.34 5.18l-238.07 340a5 5 0 0 1-4.1 2.13Zm-67.69-270h137.37c1.55 0 3.02.72 3.97 1.96.95 1.23 1.27 2.84.86 4.34l-62.33 232.61 216.29-308.9H685.52c-1.55 0-3.02-.72-3.97-1.96a4.97 4.97 0 0 1-.86-4.34l62.33-232.61-90.04 128.59q-79.35 113.32-104.91 149.83L526.73 535Z"
          />
        </svg>
        <span class="min-lightning-logo-text">
          Lightning CSS
        </span>
      </a>
    </td>
  </MinifierTemplate>
</template>
<script>
import init, {
  browserslistToTargets,
  transform
} from 'lightningcss-wasm';

import { dependencies } from '../../../package.json' with { type: 'json' };

import minifierMixin from '@/helpers/minifierMixin.js';

const version = dependencies['lightningcss-wasm'].replace('^', '');

export default {
  name: 'MinLightning',
  mixins: [minifierMixin],
  constants: {
    version
  },
  methods: {
    minify: async function () {
      await init();
      let start = new Date();
      try {
        const targets = browserslistToTargets([
          'last 1 Chrome version',
          'last 1 Firefox version',
          'last 1 Safari version'
        ]);
        const { code } = transform({
          filename: 'style.css',
          code: new TextEncoder().encode(this.input),
          minify: true,
          errorRecovery: true,
          targets,
          sourceMap: false
        });
        this.output = new TextDecoder().decode(code);
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
.min-lightning-logo-td {
  --min-lightning-gold: lch(80% 82.34 80.104);
  --min-lightning-gold-text: lch(85% 82.34 80.104);
  --min-lightning-gold-shadow: lch(80% 82.34 80.104/.7);
}
.min-lightning-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  height: var(--logo-box-height);
  background: var(--color);
  border-radius: 0px 10px 10px;
  text-decoration: none;
}
.dark .min-lightning-link {
  background: transparent;
}
.min-lightning-logo {
  height: 14px;
  filter: drop-shadow(0 0 5px var(--min-lightning-gold-shadow))
          drop-shadow(0 0 20px var(--min-lightning-gold-shadow));
  vertical-align: middle;
}
.min-lightning-outer {
  stroke-width: 30px;
  stroke: var(--min-lightning-gold);
}
.min-lightning-inner {
  fill: var(--min-lightning-gold);
}
.min-lightning-logo-text {
  color: transparent;
  font-family: urbane-rounded;
  font-size: 7.7px;
  font-weight: bold;
  letter-spacing: -.02em;
  -webkit-text-stroke: 0.8px var(--min-lightning-gold-text);
  filter: drop-shadow(0 0 2px var(--min-lightning-gold-shadow))
          drop-shadow(0px 0px 7px hsl(from var(--min-lightning-gold) h s l / 0.5));
}
</style>
