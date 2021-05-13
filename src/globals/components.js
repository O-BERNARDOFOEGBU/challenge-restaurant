import Vue from 'vue';

Vue.component('BaseInput', () =>
  import('@/components/BaseInput/BaseInput.vue')
);

Vue.component('BaseButton', () =>
  import('@/components/BaseButton/BaseButton.vue')
);
