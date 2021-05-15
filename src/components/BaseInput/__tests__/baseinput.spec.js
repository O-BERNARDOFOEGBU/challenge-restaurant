import { mount } from '@vue/test-utils';

import BaseInput from '@/components/BaseInput/BaseInput.vue';

describe('Base Input', () => {
  const wrapper = (options = {}) => mount(BaseInput, { ...options });

  it('renders an input element in the dom', (done) => {
    const InputComponent = wrapper();
    const inputElement = InputComponent.find('input');

    expect(inputElement.isVisible).toBeTruthy();
    done();
  });

  it('renders an input element with label set correctly', (done) => {
    const label = 'Email Address';
    const InputComponent = wrapper({
      propsData: {
        label,
      },
    });
    const labelElement = InputComponent.find('label');

    expect(labelElement.isVisible).toBeTruthy();
    expect(labelElement.text()).toMatch(label);
    done();
  });

  it('does not render the error element when there is no error passed to it', (done) => {
    const label = 'Email Address';
    const InputComponent = wrapper({
      propsData: {
        label,
      },
    });

    const errorElement = InputComponent.find('p.base-input__error');

    expect(errorElement.exists()).toBeFalsy();
    done();
  });

  it('renders the error element when there is an error passed to it', (done) => {
    const label = 'Email Address';
    const error = 'please provide your email address';
    const InputComponent = wrapper({
      propsData: {
        label,
        error,
      },
    });

    const errorElement = InputComponent.find('p.base-input__error');

    expect(errorElement.exists()).toBeTruthy();
    expect(errorElement.text()).toMatch(error);
    done();
  });

  it('emits the right value in the form when a user types in it', async (done) => {
    const label = 'Email Address';
    const InputComponent = wrapper({
      propsData: {
        label,
      },
    });

    const inputElement = InputComponent.find('input');
    await inputElement.setValue(20);

    const emittedEvents = InputComponent.emitted();

    expect(emittedEvents).toHaveProperty('input');
    expect(emittedEvents['input'][0][0]).toEqual('20');

    done();
  });
});
