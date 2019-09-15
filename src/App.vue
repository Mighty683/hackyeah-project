<template>
  <div id="app" @click="isIntro = false">
    <div class="start-screen" v-if="isIntro">
      <div class="loading" v-if="isLoadingIntro">Loading...</div>
      <intro @ready="handleIntroReady" @scroll-repeat="showLogo"/>
      <div class="bin" v-if="isShowingLogo">
        <img src="./assets/empty-recycle-bin.png" alt="Recycle Bin"/><br/>
        <img class="logo" src="./assets/logo-butt.png" alt="Move Your Butt">
      </div>
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
        isLoadingIntro: true,
        isModalVisible: false,
        isShowingLogo: false,
      };
    },

    created () {
      // TODO
    },

    methods: {
      toggleModal () {
        this.isModalVisible = !this.isModalVisible;
      },

      handleIntroReady () {
        this.isLoadingIntro = false;
      },

      showLogo () {
        this.isShowingLogo = true;
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
  body {
    padding: 0;
    margin: 0;
    background: #ffb3b3 url("./assets/cigarettes.jpg") no-repeat;
    background-size: cover;
    min-height: 100vh;
    background-blend-mode: luminosity;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
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
    top: 80vh;
    width: 100vw;
    text-align: center;

    .button {
      padding: 20px;
      border-radius: 10px;
      border: 1px solid grey;
      box-shadow: -2px -2px lightgrey inset, 2px 2px 5px 2px black;
      cursor: pointer;
      background: white;
    }
  }

  .loading {
    font-size: 10vw;
    color: white;
    text-shadow: 0 0 5px lightgrey;
  }

  .logo {
    width: 80vw;
  }
</style>
