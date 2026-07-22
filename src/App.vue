<template>
  <ToolBar />
  <main>
    <PlayGround />
  </main>
  <TheFooter />
</template>

<script>
import TheFooter from '@/components/TheFooter.vue';
import ToolBar from '@/components/ToolBar.vue';
import PlayGround from '@/views/PlayGround.vue';

export default {
  name: 'App',
  components: {
    PlayGround,
    TheFooter,
    ToolBar
  }
};
</script>
