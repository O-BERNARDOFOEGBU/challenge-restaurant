<template>
  <div id="app">
    <Header />

    <WelcomeMessage />

    <div class="container">
      <transition name="slide-right">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/styles';
</style>
