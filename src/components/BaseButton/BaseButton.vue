<template>
  <button type="submit" class="base-button" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
};
</script>

<style lang="scss">
@import '@/components/BaseButton/BaseButton';
</style>
