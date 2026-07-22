<template>
  <ToolBar />
  <main>
    <PlayGround />
  </main>
  <TheFooter />
</template>

<script>
import PlayGround from '@/views/PlayGround.vue';
import TheFooter from '@/components/TheFooter.vue';
import ToolBar from '@/components/ToolBar.vue';

export default {
  name: 'App',
  components: {
    PlayGround,
    TheFooter,
    ToolBar
  }
};
</script>
