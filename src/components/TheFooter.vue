<template>
  <footer>
    <p>
      100% by <a href="https://github.com/TheJaredWilcurt">TheJaredWilcurt</a> (0% by AI)
    </p>
    <p>
      Inspired by <a href="https://www.keithcirkel.co.uk/css-minify-tests">css-minify-tests</a>
    </p>
    <p>
      MIT Licensed
    </p>
    <p>
      &copy;{{ year }}
    </p>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data: function () {
    return {
      year: 2026
    };
  },
  methods: {
    getYear: async function () {
      const url = 'https://api.github.com/repos/TheJaredWilcurt/playground';

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Response status: ' + response.status);
        }

        const result = await response.json();
        const updatedAt = result?.updated_at;
        if (updatedAt) {
          this.year = (new Date(updatedAt)).getFullYear();
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  created: function () {
    this.getYear();
  }
};
</script>

<style>
footer {
  text-align: center;
  margin-top: 50px;
  font-size: 12px;
  color: var(--hljs-tag);
}
</style>
