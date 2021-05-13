import Vue from 'vue';

import App from '@/App.vue';
import router from '@/router';
import '@/globals';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
