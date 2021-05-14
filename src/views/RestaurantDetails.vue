<template>
  <div>
    <Joke />

    <Store
      class="store-list__item"
      :title="restaurant.title"
      :photo="restaurant.photo"
      :location="restaurant.location"
      :id="restaurant.id"
      v-if="restaurant"
    />
  </div>
</template>

<script>
import Store from '@/components/Store/Store.vue';
import Joke from '@/components/Joke/Joke.vue';

export default {
  name: 'RestaurantDetails',

  components: { Store, Joke },

  data: () => ({
    restaurant: null,
  }),

  created() {
    let restaurant = localStorage.getItem(
      `restaurant:${this.$route.params.restaurantId}`
    );

    if (restaurant) restaurant = JSON.parse(restaurant);

    this.restaurant = {
      ...restaurant,
      id: Number(this.$route.params.restaurantId),
    };
  },
};
</script>
