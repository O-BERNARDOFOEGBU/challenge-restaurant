<template>
  <div class="store" v-if="isVisible" @click="viewStore(id)">
    <div class="store__wrapper">
      <h2 class="store__title">{{ title }}</h2>
      <span class="store__location">{{ location }}</span>
      <img :src="photo" :alt="title" :title="title" loading="eager" />
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
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isVisible() {
      return !!this.title && !!this.location;
    },
  },
  methods: {
    viewStore(restaurantId) {
      const currentRouteId = this.$route.params.restaurantId;

      if (Number(currentRouteId) === Number(restaurantId)) return;

      const { title, location, photo } = this;

      localStorage.setItem(
        `restaurant:${restaurantId}`,
        JSON.stringify({ title, location, photo })
      );

      this.$router.push({
        name: 'RestaurantDetails',
        params: { restaurantId },
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/components/Store/Store';
</style>
