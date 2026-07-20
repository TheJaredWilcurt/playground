<template>
  <ToolBar />
  <main>
    <PlayGround />
  </main>
</template>

<script>
import PlayGround from '@/views/PlayGround.vue';
import ToolBar from '@/components/ToolBar.vue';

export default {
  name: 'App',
  components: {
    PlayGround,
    ToolBar
  }
};
</script>

