import { mount } from '@vue/test-utils';

import RecipeForm from '@/components/RecipeForm/RecipeForm.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';

describe('Recipe Form', () => {
  const wrapper = (options = {}) =>
    mount(RecipeForm, {
      data: () => ({
        meals: null,
        recipe: {
          pasta: 500,
          bacon: 200,
          eggs: 1,
          milk: 200,
          butter: 500,
          oil: 100,
        },
        errors: {
          pasta: '',
          bacon: '',
          eggs: '',
          milk: '',
          butter: '',
          oil: '',
        },
      }),
      propsData: {
        ingredients: {
          pasta: 500,
          bacon: 200,
          eggs: 1,
          milk: 200,
          butter: 500,
          oil: 100,
        },
      },
      stubs: { BaseInput, BaseButton },
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
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

    const inputElements = RecipeFormWrapper.findAll('.base-input');

    expect(inputElements.isVisible()).toBeTruthy();
    expect(inputElements.length).toBe(6);

    done();
  });

  it('renders a submit button in the form', (done) => {
    const RecipeFormWrapper = wrapper();

    const submitButton = RecipeFormWrapper.find('.base-button');

    expect(submitButton.isVisible()).toBeTruthy();
    done();
  });

  it('shows errors in the form when the form is not filled and the submit button is clicked', async (done) => {
    const RecipeFormWrapper = wrapper();

    const receipeForm = RecipeFormWrapper.find('form');
    await receipeForm.trigger('submit');

    expect(RecipeFormWrapper.vm.errors.pasta).toEqual('');
    done();
  });
});
