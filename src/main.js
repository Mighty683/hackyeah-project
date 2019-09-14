import Vue from 'vue'
import App from './App.vue'
import { EventBus } from "./event-bus/event-bus";
window.eventBus = new EventBus()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
