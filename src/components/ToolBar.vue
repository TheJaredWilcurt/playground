<template>
  <header>
    <div class="toolbar-logo-title">
      <img
        alt="CSS logo"
        class="toolbar-logo"
        src="/favicon.svg"
      />
      <h1 class="toolbar-title">
        {{ APP_NAME }}
      </h1>
    </div>
    <ThemeToggle />
  </header>
</template>

<script>
import { APP_NAME } from '@/helpers/constants.js';

import ThemeToggle from '@/components/ThemeToggle.vue';

export default {
  name: 'ToolBar',
  components: {
    ThemeToggle
  },
  constants: {
    APP_NAME
  }
};
</script>

<style>
header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  background: var(--toolbar-background);
}
.toolbar-logo-title {
  display: flex;
  align-items: center;
}
.toolbar-logo {
  display: block;
  width: 50px;
  height: 50px;
  margin: 5px 10px;
}
.toolbar-title {
  margin: 0px;
}
</style>
