<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            <div class="plogo">
              <img src="plogo.png" alt="logo" />
            </div>
            <div class="container text-header">
              <p>Did you know... ?</p>
            </div>
            <button type="button" class="btn-close" @click="close">x</button>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">{{getTip()}}</slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <div class="container--center">
              <button type="button" class="btn-green" @click="close">Zamknij</button>
            </div>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import tips from '../data/tips';

export default {
  name: "modal",

  methods: {
    close() {
      this.$emit("close");
    },
    getTip () {
        const {length} = tips
        const index = Math.floor(Math.random() * length)

        return tips[index]
      }
  }
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  border: 1px solid grey;
  box-shadow: -2px -2px lightgrey inset, 2px 2px 5px 2px black;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.container {
  display: flex;
}

.container button {
  justify-content: center
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 20px 10px;

}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-header {
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.text-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
button.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

</style>
