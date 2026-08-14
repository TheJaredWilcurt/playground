<template>
  <span class="check-box-container">
    <input
      :id="forId"
      :checked="modelValue"
      class="check-box"
      type="checkbox"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label :for="forId">
      {{ label }}
    </label>
  </span>
</template>

<script>
import { useId } from 'vue';

export default {
  name: 'CheckBox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    forId: function () {
      return useId();
    }
  }
};
</script>

<style>
.check-box-container {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.check-box {
  appearance: none;
  width: 15px;
  height: 15px;
  border: 2px solid rebeccapurple;
  background: var(--toolbar-background);
  border-radius: 0px 5px 5px;
  vertical-align: text-bottom;
}
.check-box:checked {
  background: rebeccapurple;
}
</style>
