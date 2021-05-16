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

  it('renders the application theme switch', (done) => {
    const HeaderComponent = wrapper();
    const themeSwitch = HeaderComponent.find('[data-testid="theme-switch"]');

    expect(themeSwitch.exists()).toBeTruthy();

    done();
  });

  it('switches the application theme correctly', async (done) => {
    const HeaderComponent = wrapper();
    const themeSwitch = HeaderComponent.find('[data-testid="theme-switch"]');

    let darkThemeSwitch = HeaderComponent.find('#dark-theme');

    expect(darkThemeSwitch.exists()).toBeTruthy();

    await themeSwitch.trigger('click');

    let lightThemeSwitch = HeaderComponent.find('#light-theme');

    expect(lightThemeSwitch.exists()).toBeTruthy();

    await themeSwitch.trigger('click');

    darkThemeSwitch = HeaderComponent.find('#dark-theme');
    expect(darkThemeSwitch.exists()).toBeTruthy();
    done();
  });
});
