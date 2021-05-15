import { mount } from '@vue/test-utils';

import Store from '@/components/Store/Store.vue';

describe('Recipe Form', () => {
  const routerMock = {
    push: jest.fn(),
  };
  const wrapper = (options = {}) =>
    mount(Store, {
      mocks: {
        $route: {
          params: {
            restaurantId: 2,
          },
        },
        $router: routerMock,
      },
      ...options,
    });

  it('renders the store component correctly', (done) => {
    const title = 'My Store';
    const location = 'Nigeria';
    const id = 1;

    const StoreWrapper = wrapper({
      propsData: {
        location,
        title,
        id,
      },
    });

    const storeTitle = StoreWrapper.find('.store__title');
    const storeLocation = StoreWrapper.find('.store__location');

    expect(storeTitle.text()).toBe(title);
    expect(storeLocation.text()).toBe(location);

    done();
  });

  it('renders the store photo if passed to it', (done) => {
    const title = 'My Store';
    const location = 'Nigeria';
    const id = 1;
    const photo = 'mock photo url';

    const StoreWrapper = wrapper({
      propsData: {
        location,
        title,
        id,
        photo,
      },
    });

    const storePhoto = StoreWrapper.find('img');

    expect(storePhoto.html()).toContain(photo);

    done();
  });

  it('does not render the component when either the location or the title is missing', (done) => {
    const title = 'My Store';
    const location = '';
    const id = 1;

    const StoreWrapper = wrapper({
      propsData: {
        location,
        title,
        id,
      },
    });

    expect(StoreWrapper.find('.store').exists()).toBeFalsy();

    done();
  });

  it('navigates to the store details page when the user clicks on the store', async (done) => {
    const title = 'My Store';
    const location = 'Nigeria';
    const id = 1;

    const StoreWrapper = wrapper({
      propsData: {
        location,
        title,
        id,
      },
    });

    const store = StoreWrapper.find('.store');
    await store.trigger('click');
    expect(routerMock.push).toHaveBeenCalledTimes(1);
    done();
  });
});
