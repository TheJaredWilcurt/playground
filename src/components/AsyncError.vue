<template>
  <tr>
    <td
      class="async-error-td"
      colspan="4"
    >
      <span
        v-text="'[ ERROR LOADING MINIFIER ]'.replaceAll(' ', '&nbsp;')"
        class="async-error-error"
      ></span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'AsyncError'
};
</script>

<style>
.async-error-td {
  text-align: center;
}
.async-error-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--logo-box-height);
  background: var(--toolbar-background);
  border-radius: 0px 10px 10px;
  color: var(--color);
  font-weight: 900;
  letter-spacing: 1px;
  word-break: break-all;
}
</style>
