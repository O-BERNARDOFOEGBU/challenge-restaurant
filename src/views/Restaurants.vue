<template>
  <div class="page page__stores">
    <div class="pages__stores-list">
      <Loader v-if="loading" class="loader" />
      <StoreList :stores="stores" v-else />
    </div>
  </div>
</template>

<script>
import StoreList from '@/components/StoreList/StoreList';
import Loader from '@/components/Loader/Loader';

export default {
  name: 'Stores',
  components: {
    StoreList,
    Loader,
  },
  data() {
    return {
      stores: [],
      loading: true,
    };
  },

  mounted() {
    fetch('assets/stores/stores.json')
      .then((response) => response.json())
      .then((response) => {
        this.stores = response;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="scss">
.pages__stores-list {
  display: flex;
  justify-content: center;
}

.loader {
  fill: var(--color-primary);
}
</style>
