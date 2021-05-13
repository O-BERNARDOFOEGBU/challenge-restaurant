<template>
  <div class="base-input">
    <label :for="uniqueId" class="base-input__label">{{ label }}</label>
    <input
      class="base-input__input"
      type="number"
      :name="inputName"
      :id="uniqueId"
      min="0"
      v-bind="$attrs"
      :aria-describedby="error ? `${uniqueId}-error` : null"
      @input="$emit('input', $event.target.value)"
    />

    <p
      v-if="error"
      aria-live="assertive"
      :id="`${uniqueId}-error`"
      class="base-input__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({ uniqueId: Math.abs(Math.random().toFixed(5)) }),

  computed: {
    inputName() {
      return `${this.uniqueId}-${this.label}`;
    },
  },

  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
@import '@/components/BaseInput/BaseInput';
</style>
