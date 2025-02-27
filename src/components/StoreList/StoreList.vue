<template>
  <div class="store-list">
    <p class="store-list__header" data-testid="heading">
      Here you can find all of our restaurants. We have {{ storesCount }} stores
      right now!
    </p>

    <BaseInput
      type="search"
      v-model="searchInput"
      data-testid="search-input"
      placeholder="search stores by name..."
    />

    <transition name="fade" appear mode="out-in">
      <section class="store-list__stores">
        <Store
          class="store-list__item"
          :title="store.name"
          :photo="store.image"
          :location="store.location"
          :id="store.id"
          v-for="store in paginatedStores"
          :key="store.id"
        />
      </section>
    </transition>

    <section class="store-list__pagination">
      <BaseButton
        class="store-list__pagination-control"
        data-testid="firstPage"
        @click="goToFirstPage"
        >First Page</BaseButton
      >
      <BaseButton
        @click="goToPreviousPage"
        class="store-list__pagination-control"
        data-testid="previousPage"
        >Previous Page</BaseButton
      >
      <BaseButton
        class="store-list__pagination-control"
        data-testid="nextPage"
        @click="goToNextPage"
        >Next Page</BaseButton
      >
      <BaseButton
        class="store-list__pagination-control"
        @click="goToLastPage"
        data-testid="lastPage"
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
    searchInput: '',
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
      return this.stores
        .map((store) => {
          store['image'] = 'https://via.placeholder.com/300?text=' + store.name;

          return store;
        })
        .filter((store) => store.name.includes(this.searchInput));
    },

    paginatedStores() {
      const offset = this.limit * (this.currentPage - 1);

      return this.storesWithImages.slice(offset, this.limit * this.currentPage);
    },

    storesCount() {
      return this.stores.length;
    },

    storesMatchCount() {
      return this.storesWithImages.length;
    },

    totalPages() {
      return Math.round(this.storesMatchCount / this.limit);
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
