<template>
  <span class="loading-dots">
    <span class="loading-dots-dot loading-dots-dot-1">•</span>
    <span class="loading-dots-dot loading-dots-dot-2">•</span>
    <span class="loading-dots-dot loading-dots-dot-3">•</span>
  </span>
</template>

<script>
export default {
  name: 'LoadingDots'
};
</script>

<style>
.loading-dots {
  display: flex;
  height: var(--logo-box-height);
  align-items: center;
  justify-content: center;
  background: var(--toolbar-background);
  border-radius: 0px 10px 10px;
  color: var(--light-text);
  font-size: 18px;
}
.loading-dots-dot {
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.loading-dots-dot + .loading-dots-dot {
  margin-left: 0.25rem;
}
.loading-dots-dot-1 { animation-name: loading-dots-dot-1; }
.loading-dots-dot-2 { animation-name: loading-dots-dot-2; }
.loading-dots-dot-3 { animation-name: loading-dots-dot-3; }

@keyframes loading-dots-dot-1 {
  0%,
  19.9%,
  100% { opacity: 0; }
  20%,
  99% { opacity: 1; }
}
@keyframes loading-dots-dot-2 {
  0%,
  39.9%,
  100% { opacity: 0; }
  40%,
  99% { opacity: 1; }
}
@keyframes loading-dots-dot-3 {
  0%,
  59.9%,
  100% { opacity: 0; }
  60%,
  99.9% { opacity: 1; }
}
</style>
