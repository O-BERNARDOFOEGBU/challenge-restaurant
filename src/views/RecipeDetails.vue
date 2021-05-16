<template>
  <div class="page">
    <Banner text="Welcome to Favour's store" />

    <div>
      <Joke />
    </div>

    <section class="page__section">
      <h4>
        To make 1 portion of proper Pasta carbonara meal, you need the following
        ingredients in this proportion:
      </h4>
      <p
        v-for="(quantity, ingredient) in secretIngredients"
        :key="ingredient"
        class="ingredient"
      >
        {{ ingredient }}: {{ quantity }}
      </p>
    </section>

    <section class="page__section">
      <h4>
        You specified the following ingredients available in your kitchen:
      </h4>
      <p
        v-for="(quantity, ingredient) in recipe"
        :key="ingredient"
        class="ingredient"
      >
        {{ ingredient }}: {{ quantity }}
      </p>
    </section>

    <section class="page__section">
      <h4 data-testid="meals-label">
        Amount of Meals you can make with your ingredients:
      </h4>
      <h4 data-testid="meals-value">{{ meals }}</h4>
    </section>
  </div>
</template>

<script>
import Banner from '@/components/Banner/Banner.vue';

export default {
  data: () => ({
    meals: '',
    recipe: '',
    secretIngredients: '',
  }),

  components: {
    Banner,
  },

  mounted() {
    const {
      query: { meals, recipe, secretIngredients },
    } = this.$route;

    if (!meals || !recipe || !secretIngredients) return;

    this.meals = String(meals);
    this.secretIngredients = JSON.parse(secretIngredients);
    this.recipe = JSON.parse(recipe);
  },
};
</script>

<style lang="scss">
.ingredient {
  margin: var(--space-xs) 0;
  padding: var(--space-xs);

  border: 1px solid var(--color-primary);
}
</style>
