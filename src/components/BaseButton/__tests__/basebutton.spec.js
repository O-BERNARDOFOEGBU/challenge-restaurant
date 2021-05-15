import { mount } from '@vue/test-utils';

import BaseButton from '@/components/BaseButton/BaseButton.vue';

describe('Base Button', () => {
  const wrapper = (options = {}) => mount(BaseButton, { ...options });

  it('renders a button element in the dom', (done) => {
    const ButtonComponent = wrapper();
    const buttonElement = ButtonComponent.find('button');

    expect(buttonElement.isVisible).toBeTruthy();
    done();
  });

  it('renders the correct text passed as slot', (done) => {
    const ButtonComponent = wrapper({
      slots: {
        default: 'Click Me',
      },
    });
    const buttonElement = ButtonComponent.find('button');

    expect(buttonElement.text()).toMatch('Click Me');
    done();
  });

  it('emits the click event when the button is clicked on', async (done) => {
    const ButtonComponent = wrapper({
      slots: {
        default: 'Click Me',
      },
    });
    await ButtonComponent.find('button').trigger('click');

    const emittedEvents = ButtonComponent.emitted();

    expect(emittedEvents).toHaveProperty('click');

    done();
  });
});
