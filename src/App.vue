<template>
  <div id="app" @click="isIntro = false">
    <div class="start-screen" v-if="isIntro">
      <intro/>
      <div class="menu">
        <button class="button" @click="isIntro = false">START</button>
      </div>
    </div>
    <template v-else>
      <button type="button" class="btn-close" @click="toggleModal">ELO 320</button>
      <game/>
      <modal @close="toggleModal" v-if="isModalVisible"/>
    </template>
  </div>
</template>

<script>
  import Game from './components/Game.vue';
  import Intro from './components/Intro';
  import Modal from './components/Modal.vue';

  export default {
    name: 'app',

    data () {
      return {
        isIntro: true,
        isModalVisible: false,
      };
    },

    methods: {
      toggleModal () {
        this.isModalVisible = !this.isModalVisible;
      },
    },

    components: {
      Intro,
      Game,
      Modal,
    },
  };
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .start-screen {
    height: 75vh;
    text-align: center;
  }
  .menu {
    position: fixed;
    bottom: 10%;
    text-align: center;
    width: 100%;

    .button {
      padding: 20px;
      border-radius: 10px;
      border: 1px solid grey;
      box-shadow: -2px -2px lightgrey inset;
      cursor: pointer;
    }
  }
</style>
