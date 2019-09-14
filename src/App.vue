<template>
  <div id="app" @click="isIntro = false">
    <intro v-if="isIntro"/>
    <game v-else/>
  </div>
</template>

<script>
import Game from './components/Game.vue'
import Intro from './components/Intro';

export default {
  name: 'app',

  data () {
    return {
      isIntro: true,
    };
  },

  components: {
    Intro,
    Game
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
