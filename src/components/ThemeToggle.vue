<template>
  <button
    class="theme-toggle-button"
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
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleTheme: function () {
      this.isDark = !this.isDark;
      this.applyTheme();
    }
  },
  created: function () {
    this.applyTheme();
  }
};
</script>

<style>
.theme-toggle-button {
  display: flex;
  align-items: end;
  border: 0px;
  border-radius: 0px 8px 8px;
  margin: 0px 10px 7px;
  padding: 4px 6px 3px 20px;
  font-weight: bold;
  font-size: 21px;
  text-transform: uppercase;
}
</style>
