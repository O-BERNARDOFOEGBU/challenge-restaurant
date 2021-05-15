import { mount } from '@vue/test-utils';
import FlushPromises from 'flush-promises';

import Joke from '@/components/Joke/Joke.vue';

describe('Base Input', () => {
  const wrapper = (options = {}) => mount(Joke, { ...options });

  describe('No Joke passed', () => {
    it('renders a header element to show the title in the dom', (done) => {
      window.fetch = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({ json: () => Promise.resolve([]) })
        );
      const JokeComponent = wrapper();
      const headerElement = JokeComponent.find('header');

      expect(headerElement.isVisible).toBeTruthy();
      expect(headerElement.text()).toBe('Joke of the day');
      done();
    });
  });

  describe('API Success', () => {
    it('renders a paragraph element in the dom', async (done) => {
      const joke = `Knock, Knock, Who's there? Jamaican. Jamaican who? Jamaican me crazy!`;

      window.localStorage.setItem(
        'joke',
        JSON.stringify({ joke, validFor: 15 })
      );

      window.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              contents: {
                jokes: [
                  {
                    joke: {
                      text: joke,
                    },
                  },
                ],
              },
            }),
        })
      );

      const JokeComponent = wrapper();

      await FlushPromises();

      const paragraphElement = JokeComponent.find('p');

      expect(paragraphElement.isVisible).toBeTruthy();
      expect(paragraphElement.text()).toBe(joke);
      done();
    });
  });
});
