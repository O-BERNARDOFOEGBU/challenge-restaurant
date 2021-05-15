import { mount } from '@vue/test-utils';

import StoreList from '@/components/StoreList/StoreList.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';

const stores = [
  { id: 1, name: 'Store 001', location: 'Spain' },
  { id: 2, name: 'Store 002', location: 'Spain' },
  { id: 3, name: 'Store 003', location: 'Spain' },
  { id: 4, name: 'Store 004', location: 'Spain' },
  { id: 5, name: 'Store 005', location: 'Spain' },
  { id: 6, name: 'Store 006', location: 'Spain' },
  { id: 7, name: 'Store 007', location: 'Spain' },
  { id: 8, name: 'Store 008', location: 'Spain' },
  { id: 9, name: 'Store 009', location: 'Spain' },
  { id: 10, name: 'Store 010', location: 'Spain' },
  { id: 11, name: 'Store 011', location: 'Spain' },
  { id: 12, name: 'Store 012', location: 'Spain' },
  { id: 13, name: 'Store 013', location: 'Spain' },
  { id: 14, name: 'Store 014', location: 'Spain' },
  { id: 15, name: 'Store 015', location: 'Spain' },
  { id: 16, name: 'Store 016', location: 'Spain' },
  { id: 17, name: 'Store 017', location: 'Spain' },
  { id: 18, name: 'Store 018', location: 'Spain' },
  { id: 19, name: 'Store 019', location: 'Spain' },
  { id: 20, name: 'Store 020', location: 'Spain' },
];

describe('StoreList Component', () => {
  const wrapper = (options = {}) =>
    mount(StoreList, {
      propsData: {
        stores,
      },
      stubs: { BaseInput, BaseButton },
      ...options,
    });

  it('renders the storelist component correctly', (done) => {
    const StoreListWrapper = wrapper();

    expect(StoreListWrapper.exists()).toBeTruthy();
    expect(StoreListWrapper.findAll('.store-list__item').length).toBe(10);

    done();
  });

  it('renders the storelist components with no store', (done) => {
    const StoreListWrapper = wrapper({ propsData: {} });

    expect(StoreListWrapper.exists()).toBeTruthy();
    expect(StoreListWrapper.findAll('.store-list__item').length).toBe(0);

    done();
  });

  it('renders an input of type search for users to filter the stores', (done) => {
    const StoreListWrapper = wrapper();

    const input = StoreListWrapper.find('.base-input');

    expect(input.isVisible()).toBeTruthy();

    done();
  });

  it('renders buttons necessary to view different pages', (done) => {
    const StoreListWrapper = wrapper();

    const paginationControls = StoreListWrapper.findAll(
      '.store-list__pagination-control'
    );
    expect(paginationControls.length).toBe(4);

    done();
  });

  it('navigates to the appropriate page when the user clicks on the page button', async (done) => {
    const StoreListWrapper = wrapper();

    expect(StoreListWrapper.vm.currentPage).toBe(1);

    const goToNextPageButton = StoreListWrapper.find(
      '.store-list__pagination-control[data-testid="nextPage"]'
    );
    const goToPreviousPageButton = StoreListWrapper.find(
      '.store-list__pagination-control[data-testid="previousPage"]'
    );

    await goToNextPageButton.trigger('click');

    const page2Stores = StoreListWrapper.findAll('.store-list__item');

    expect(page2Stores.length).toBe(10);
    expect(StoreListWrapper.vm.currentPage).toBe(2);
    expect(page2Stores.at(0).html()).toContain(11);

    await goToPreviousPageButton.trigger('click');
    expect(StoreListWrapper.vm.currentPage).toBe(1);

    done();
  });

  it('filters the stores based on the user search input', async (done) => {
    const StoreListWrapper = wrapper();

    await StoreListWrapper.setData({ searchInput: '001' });

    const page2Stores = StoreListWrapper.findAll('.store-list__item');

    expect(page2Stores.at(0).html()).toContain('001');

    done();
  });
});
