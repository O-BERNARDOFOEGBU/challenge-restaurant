<template>
  <div class="joke">
    <header class="joke__header">Joke of the day</header>
    <p class="joke__body">{{ joke }}</p>
  </div>
</template>

<script>
export default {
  name: 'JokeOfTheDay',
  data: () => ({
    joke: '',
    jokes: [],
  }),

  methods: {
    getJoke() {
      let jokeFromCache = this.getJokeFromCache();

      if (jokeFromCache) {
        jokeFromCache = JSON.parse(jokeFromCache);

        // check the expiresIn
        const today = new Date().getDay();
        if (today <= jokeFromCache.validFor) {
          this.joke = jokeFromCache.joke;
          return;
        }
      }

      fetch('https://api.jokes.one/jod?category=knock-knock')
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            throw new Error(JSON.stringify(response.error));
          }

          localStorage.setItem(
            'joke',
            JSON.stringify({
              joke: response.contents.jokes[0].joke.text,
              validFor: new Date().getDay(),
            })
          );
          this.joke = response.contents.jokes[0].joke.text;
        })

        .catch(() => {
          // if for whatever reason, there is an error
          // usually if the server returns a response for rate-limiting
          // use the cache

          this.getJokeFromCache();
        });
    },

    getJokeFromCache() {
      const jokeOfTheDay = localStorage.getItem('joke');

      return jokeOfTheDay;
    },
  },

  mounted() {
    this.getJoke();
  },
};
</script>

<style lang="scss">
@import '@/components/Joke/Joke';
</style>
