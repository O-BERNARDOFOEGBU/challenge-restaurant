<template>
  <div class="header">
    <ul class="header__navigation">
      <li class="header__navigation-item">
        <router-link to="/" class="header__navigation-item-link"
          >Home</router-link
        >
      </li>
      <li class="header__navigation-item">
        <router-link to="/meals" class="header__navigation-item-link"
          >Carbonara Meals Calculator</router-link
        >
      </li>
      <li class="header__navigation-item">
        <router-link to="/restaurants" class="header__navigation-item-link"
          >Our Restaurants</router-link
        >
      </li>
    </ul>

    <div
      class="header__theme-toggler"
      data-testid="theme-switch"
      @click="switchTheme"
    >
      <img id="light-theme" src="/assets/icons/sun.svg" v-if="isDarkMode" />
      <img src="/assets/icons/moon.svg" id="dark-theme" v-else />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data: () => ({
    theme: 'light',
  }),

  computed: {
    isDarkMode() {
      return this.theme === 'dark';
    },
  },

  methods: {
    switchTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
        localStorage.setItem('theme', 'light');
        return;
      }

      this.theme = 'dark';
      localStorage.setItem('theme', 'dark');
    },
  },

  watch: {
    theme(currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    },
  },

  mounted() {
    const lastSetTheme = localStorage.getItem('theme');
    if (lastSetTheme) {
      this.theme = lastSetTheme;
    }
  },
};
</script>

<style lang="scss">
@import '@/components/Header/Header';
</style>
