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
      <game/>
      <modal @close="closeModal" v-if="isModalVisible"/>
    </template>
  </div>
</template>

<script>
  import Game from './components/Game.vue';
  import Intro from './components/Intro';
  import Modal from './components/Modal.vue';
  import EventBus from './event-bus/event-bus'

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
      EventBus.$on('show-modal', this.showModal)
      window.addEventListener('keydown', (e)=> {
        if(e.keyCode === 32) {
          e.preventDefault()
        }
      })
    },

    methods: {
      closeModal () {
        EventBus.$emit('modal-closed')
        this.isModalVisible = false
      },

      showModal () {
        this.isModalVisible = true
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
      font-weight: bold;
      font-size: 20px;
    }
  }

  .loading {
    font-size: 10vw;
    color: black;
    text-shadow: 0 0 5px lightgrey;
  }

  .logo {
    width: 60vw;
  }
</style>
