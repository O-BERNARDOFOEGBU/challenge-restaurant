<template>
  <div class="recipe-form">
    <p>
      Introduce below the quantity for each ingredient you have and we will
      calculate how many Pasta Carbonara meals you can cook!
    </p>
    <form class="recipe-form__form" @submit.prevent="calculate">
      <BaseInput
        :error="errors.eggs"
        label="Eggs"
        v-model.number="recipe.eggs"
      />

      <BaseInput
        :error="errors.pasta"
        label="Pasta"
        v-model.number="recipe.pasta"
      />

      <BaseInput
        :error="errors.butter"
        label="Butter"
        v-model.number="recipe.butter"
      />

      <BaseInput
        :error="errors.milk"
        label="Milk"
        v-model.number="recipe.milk"
      />

      <BaseInput :error="errors.oil" label="Oil" v-model.number="recipe.oil" />

      <BaseInput
        :error="errors.bacon"
        label="Bacon"
        v-model.number="recipe.bacon"
      />

      <BaseButton type="submit" class="recipe-form__form-submit"
        >Calculate</BaseButton
      >
    </form>
  </div>
</template>

<script>
export default {
  name: 'RecipeForm',
  data() {
    return {
      meals: null,

      recipe: {
        pasta: 1040,
        bacon: 410,
        eggs: 3,
        milk: 405,
        butter: 1010,
        oil: 300,
      },

      errors: {
        eggs: '',
        pasta: '',
        butter: '',
        milk: '',
        oil: '',
        bacon: '',
      },
    };
  },

  props: {
    ingredients: {
      type: Object,
      required: true,
      validator(ingredients) {
        const ingredientKeys = Object.keys(ingredients);

        return [
          'pasta',
          'bacon',
          'eggs',
          'milk',
          'butter',
          'oil',
        ].every((field) => ingredientKeys.includes(field));
      },
    },
  },

  computed: {
    formIsNotValid() {
      return Object.values(this.errors).some(
        (errorMessage) => errorMessage.length > 0
      );
    },
  },

  methods: {
    validateForm() {
      Object.keys(this.recipe).forEach((field) => {
        if (this.recipe[field] < 0) {
          this.errors[field] = 'The least quantity is 0';
        } else {
          this.errors[field] = '';
        }
      });
    },

    calculate() {
      // validate the form for errors
      this.validateForm();
      this.meals = null;

      if (this.formIsNotValid) return;

      // compare the quantity user provided with the secret recipe
      // the secret recipe is enough to product one meal

      // depending on the amount of ingredients the user specifies, then
      // the secret recipe should be used to determine the number of meals this user can get

      const {
        eggs: minimumEggsQuantity,
        pasta: minimumPastaQuantity,
        butter: minimumButterQuantity,
        milk: minimumMilkQuantity,
        oil: minimumOilQuantity,
        bacon: minimumBaconQuantity,
      } = this.ingredients;

      const { eggs, pasta, butter, milk, oil, bacon } = this.recipe;

      // we want to get the proportion of each ingredient as we compare it with the secret ingredient

      const proportionOfEggs = Math.round(eggs / minimumEggsQuantity);
      const proportionOfPasta = Math.round(pasta / minimumPastaQuantity);
      const proportionOfButter = Math.round(butter / minimumButterQuantity);
      const proportionOfMilk = Math.round(milk / minimumMilkQuantity);
      const proportionOfOil = Math.round(oil / minimumOilQuantity);
      const proportionOfBacon = Math.round(bacon / minimumBaconQuantity);

      [
        proportionOfEggs,
        proportionOfPasta,
        proportionOfButter,
        proportionOfMilk,
        proportionOfOil,
        proportionOfBacon,
      ].forEach((portion) => {
        if (this.meals === null) {
          this.meals = portion;
        } else if (Number(portion) < Number(this.meals)) {
          this.meals = portion;
        }
      });

      this.$router.push({
        name: 'RecipeDetails',
        query: {
          meals: this.meals,
          // we could use localstorage to pass this data, but I decided against it here.
          // if we had a store setup too, we could use it to pass this data
          // but the simplest way to have done this is through the route
          recipe: JSON.stringify(this.recipe),
          secretIngredients: JSON.stringify(this.ingredients),
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/components/RecipeForm/RecipeForm';
</style>
