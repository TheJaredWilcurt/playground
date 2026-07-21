<template>
  <tr>
    <td
      class="async-loading-td"
      colspan="4"
    >
      <span
        class="async-loading"
        title="Async component loading"
      >
        <span class="async-loading-dot async-loading-dot-1">•</span>
        <span class="async-loading-dot async-loading-dot-2">•</span>
        <span class="async-loading-dot async-loading-dot-3">•</span>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'AsyncLoading'
};
</script>

<style>
.async-loading-td {
  text-align: center;
}
.async-loading {
  display: flex;
  height: 35px;
  align-items: center;
  justify-content: center;
  background: var(--toolbar-background);
  border-radius: 0px 10px 10px;
  color: var(--light-text);
  font-size: 18px;
}
.async-loading-dot {
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.async-loading-dot + .async-loading-dot {
  margin-left: 0.25rem;
}
.async-loading-dot-1 { animation-name: async-loading-dot-1; }
.async-loading-dot-2 { animation-name: async-loading-dot-2; }
.async-loading-dot-3 { animation-name: async-loading-dot-3; }

@keyframes async-loading-dot-1 {
  0%,
  19.9%,
  100% { opacity: 0; }
  20%,
  99% { opacity: 1; }
}
@keyframes async-loading-dot-2 {
  0%,
  39.9%,
  100% { opacity: 0; }
  40%,
  99% { opacity: 1; }
}
@keyframes async-loading-dot-3 {
  0%,
  59.9%,
  100% { opacity: 0; }
  60%,
  99.9% { opacity: 1; }
}
</style>
