import { mount, RouterLinkStub } from '@vue/test-utils';

import Header from '@/components/Header/Header.vue';

describe('Header', () => {
  const wrapper = (options = {}) =>
    mount(Header, {
      ...options,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

  it('renders a ul element in the dom', (done) => {
    const HeaderComponent = wrapper();
    const ulElement = HeaderComponent.find('ul');

    expect(ulElement.isVisible).toBeTruthy();
    done();
  });

  it('renders at least one li element in the dom', (done) => {
    const HeaderComponent = wrapper();
    const liElement = HeaderComponent.findAll('li');

    expect(liElement.length).toBeGreaterThan(0);
    done();
  });
});
