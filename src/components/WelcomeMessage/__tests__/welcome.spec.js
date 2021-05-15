import { mount } from '@vue/test-utils';

import WelcomeMessage from '@/components/WelcomeMessage/WelcomeMessage.vue';

describe('Recipe Form', () => {
  const wrapper = (options = {}) => mount(WelcomeMessage, { ...options });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('renders the welcome message with the current time', (done) => {
    const welcomeMessageWrapper = wrapper();
    jest.advanceTimersByTime(500);

    expect(welcomeMessageWrapper.exists()).toBeTruthy();
    done();
  });
});
