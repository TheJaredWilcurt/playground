<template>
  <tr>
    <td
      class="async-loading-td"
      colspan="4"
    >
      <LoadingDots title="Async component loading" />
    </td>
  </tr>
</template>

<script>
import LoadingDots from '@/components/LoadingDots.vue';

export default {
  name: 'AsyncLoading',
  components: {
    LoadingDots
  }
};
</script>

<style>
.async-loading-td {
  text-align: center;
}
.async-loading {
  display: flex;
  height: var(--logo-box-height);
  align-items: center;
  justify-content: center;
  background: var(--toolbar-background);
  border-radius: 0px 10px 10px;
  color: var(--light-text);
  font-size: 18px;
}
</style>
