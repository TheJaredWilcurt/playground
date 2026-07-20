<template>
  <ToolBar />
  <main>
    <PlayGround />
  </main>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue';
import PlayGround from '@/views/PlayGround.vue';

export default {
  name: 'App',
  components: {
    PlayGround,
    ToolBar
  }
};
</script>
