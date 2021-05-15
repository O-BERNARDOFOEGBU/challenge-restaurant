import { mount } from '@vue/test-utils';

import StoreList from '@/components/StoreList/StoreList.vue';

import stores from ''

describe('StoreList Component', () => {
  const wrapper = (options = {}) =>
    mount(StoreList, {
      props: {
        ingredients: {
          pasta: 500,
          bacon: 200,
          eggs: 1,
          milk: 200,
          butter: 500,
          oil: 100,
        },
      },
      stubs: ['BaseInput', 'BaseButton'],
      ...options,
    });
}
