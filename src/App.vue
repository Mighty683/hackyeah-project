<template>
  <div id="app">
    <button type="button" class="btn-close" @click="toggleModal">ELO 320</button>
    <game />
    <modal @close="toggleModal" v-if="isModalVisible" />
  </div>
</template>

<script>
import Game from "./components/Game.vue";
import Modal from "./components/Modal.vue";
export default {
  name: "app",
  components: {
    Game,
    Modal
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
