import { mount } from '@vue/test-utils';

import RecipeForm from '@/components/RecipeForm/RecipeForm.vue';

describe('Recipe Form', () => {
  const wrapper = (options = {}) =>
    mount(RecipeForm, {
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

  it('renders a form element in the dom', (done) => {
    const RecipeFormWrapper = wrapper();

    const formElement = RecipeFormWrapper.find('form');

    expect(formElement.isVisible()).toBeTruthy();

    done();
  });

  it('renders input elements in the dom', (done) => {
    const RecipeFormWrapper = wrapper();

    const inputElements = RecipeFormWrapper.findAll('baseinput-stub');

    expect(inputElements.isVisible()).toBeTruthy();
    expect(inputElements.length).toBe(6);

    done();
  });

  it('renders a submit button in the form', (done) => {
    const RecipeFormWrapper = wrapper();

    const submitButton = RecipeFormWrapper.find('basebutton-stub');

    expect(submitButton.isVisible()).toBeTruthy();
    done();
  });
});
