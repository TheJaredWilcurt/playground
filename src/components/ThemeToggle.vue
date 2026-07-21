<template>
  <button
    class="theme-toggle-button"
    title="Light/Dark mode toggle"
    @click="toggleTheme"
  >
    <template v-if="isDark">
      Light
    </template>
    <template v-else>
      Dark
    </template>
  </button>
</template>

<script>
const KEY = 'css-minifier-playground-theme';

export default {
  name: 'ThemeToggle',
  data: function () {
    return {
      isDark: true
    };
  },
  methods: {
    applyTheme: function () {
      if (this.isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(KEY, 'light');
      }
    },
    loadTheme: function () {
      this.isDark = true;
      const value = localStorage.getItem(KEY);
      if (value === 'light') {
        this.isDark = false;
      }
      this.applyTheme();
    },
    toggleTheme: function () {
      this.isDark = !this.isDark;
      this.applyTheme();
    }
  },
  created: function () {
    this.loadTheme();
  }
};
</script>

<style>
.theme-toggle-button {
  display: flex;
  align-items: end;
  align-self: end;
  height: 31.15px;
  border: 0px;
  border-radius: 0px 8px 8px;
  margin: 0px 10px 7px;
  padding: 4px 6px 3px 20px;
  font-weight: bold;
  font-size: 21px;
  text-transform: uppercase;
}
</style>
