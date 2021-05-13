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

      <button type="submit" class="recipe-form__form-submit">Calculate</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RecipeForm',
  data() {
    return {
      meals: 0,

      recipe: {
        eggs: 0,
        pasta: 0,
        butter: 0,
        milk: 0,
        oil: 0,
        bacon: 0,
      },

      errors: {
        eggs: 'Error occured!',
        pasta: 'Error occured!',
        butter: 'Error occured!',
        milk: 'Error occured!',
        oil: 'Error occured!',
        bacon: 'Error occured!',
      },
    };
  },
  props: {
    ingredients: {
      type: Object,
      required: true,
    },
  },
  methods: {
    calculate() {
      // validate the form for errors
      // compare the quantity user provided with the secret recipe
      // the secret recipe is enough to product one meal
      // depending on the amount of ingredients the user specifies, then
      // the secret recipe should be used to determine the number of meals this user can get
    },
  },
};
</script>

<style lang="scss">
@import '@/components/RecipeForm/RecipeForm';
</style>
