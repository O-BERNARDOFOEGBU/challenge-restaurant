<template>
  <div class="page page__stores">
    <div class="pages__stores-list">
      <StoreList :stores="stores" />
    </div>
  </div>
</template>

<script>
import StoreList from '@/components/StoreList/StoreList';

import stores from '@/assets/stores/stores.json';

export default {
  name: 'Stores',
  components: {
    StoreList,
  },
  data() {
    return {
      stores,
    };
  },
};
</script>
