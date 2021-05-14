<template>
  <div class="container">
    <div class="page">{{ welcomeMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeMessage',

  data: () => ({
    currentTime: '',
    intervalId: '',
  }),

  computed: {
    welcomeMessage() {
      return 'Welcome! Your local time is: ' + this.currentTime;
    },
  },

  methods: {
    setTime() {
      this.intervalId = setInterval(() => {
        this.currentTime = new Date().toUTCString();
      }, 500);
    },
  },

  mounted() {
    this.setTime();
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
