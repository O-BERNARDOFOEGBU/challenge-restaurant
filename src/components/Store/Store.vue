<template>
  <div class="store" v-if="isVisible">
    <div class="store__wrapper">
      <h2 class="store__title">{{ title }}</h2>
      <span class="store__location">{{ location }}</span>
      <img :src="photo" :alt="title" :title="title" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Store',
  props: {
    title: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  computed: {
    isVisible() {
      return !!this.title && !!this.location;
    },
  },
};
</script>

<style lang="scss">
@import '@/components/Store/Store';
</style>
