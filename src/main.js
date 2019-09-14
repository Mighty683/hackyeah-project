import Vue from 'vue'
import App from './App.vue'
import EventBus from './event-bus/event-bus';
Vue.config.productionTip = false;

EventBus.$on('win-game', () => console.log('WIN!'));

new Vue({
  render: h => h(App),
}).$mount('#app')
