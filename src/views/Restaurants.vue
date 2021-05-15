<template>
  <div class="page page__stores">
    <div class="pages__stores-list">
      <StoreList :stores="stores" />
    </div>
  </div>
</template>

<script>
import StoreList from '@/components/StoreList/StoreList';

export default {
  name: 'Stores',
  components: {
    StoreList,
  },
  data() {
    return {
      stores: [],
    };
  },

  mounted() {
    fetch('assets/stores/stores.json')
      .then((response) => response.json())
      .then((response) => {
        this.stores = response;
      });
  },
};
</script>
