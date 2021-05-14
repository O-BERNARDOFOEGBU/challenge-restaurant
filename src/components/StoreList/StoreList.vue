<template>
  <div class="store-list">
    <p class="store-list__header">
      Here you can find all of our restaurants. We have {{ storesCount }} stores
      right now!
    </p>

    <transition name="fade" appear mode="out-in">
      <section class="store-list__stores">
        <Store
          class="store-list__item"
          :title="store.name"
          :photo="store.image"
          :location="store.location"
          v-for="store in paginatedStores"
          :key="store.id"
        />
      </section>
    </transition>

    <section class="store-list__pagination">
      <BaseButton class="store-list__pagination-control" @click="goToFirstPage"
        >First Page</BaseButton
      >
      <BaseButton
        @click="goToPreviousPage"
        class="store-list__pagination-control"
        >Previous Page</BaseButton
      >
      <BaseButton class="store-list__pagination-control" @click="goToNextPage"
        >Next Page</BaseButton
      >
      <BaseButton class="store-list__pagination-control" @click="goToLastPage"
        >Last Page</BaseButton
      >
    </section>
  </div>
</template>

<script>
import Store from '@/components/Store/Store';

export default {
  name: 'StoreList',
  data: () => ({
    currentPage: 1,
    limit: 10,
  }),
  components: {
    Store,
  },
  props: {
    stores: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    storesWithImages() {
      return this.stores.map((store) => {
        store['image'] = 'https://via.placeholder.com/300?text=' + store.name;

        return store;
      });
    },

    paginatedStores() {
      const offset = this.limit * (this.currentPage - 1);

      return this.storesWithImages.slice(offset, this.limit * this.currentPage);
    },

    storesCount() {
      return this.stores.length;
    },

    totalPages() {
      return Math.round(this.storesCount / this.limit);
    },
  },

  methods: {
    goToPreviousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    goToFirstPage() {
      if (this.currentPage !== 1) this.currentPage = 1;
    },
    goToLastPage() {
      if (this.currentPage !== this.totalPages)
        this.currentPage = this.totalPages;
    },
  },
};
</script>

<style lang="scss">
@import '@/components/StoreList/StoreList';
</style>
