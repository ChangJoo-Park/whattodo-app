import Vue from 'vue'
import Vuebar from 'vuebar'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' // agregar los estilos
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vuebar)
Vue.use(Vuesax)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
