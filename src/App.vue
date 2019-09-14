<template>
  <div id="app" @click="isIntro = false">
    <button type="button" class="btn-close" @click="toggleModal">ELO 320</button>
    <intro v-if="isIntro"/>
    <game v-else/>
    <modal @close="toggleModal" v-if="isModalVisible" />
  </div>
</template>

<script>
import Game from './components/Game.vue'
import Intro from './components/Intro';
import Modal from "./components/Modal.vue";

export default {
  name: 'app',

  data () {
    return {
      isIntro: true,
      isModalVisible: false,
    };
  },

  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    }
  },

  components: {
    Intro,
    Game,
    Modal,
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
