import Vue from 'vue'
import VueSelect from 'vue-cool-select'
import App from './App.vue'
import router from './router'

const theme = window.location.hash.slice(1) || 'bootstrap';

Vue.use(VueSelect, {
  theme: theme
})

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')



