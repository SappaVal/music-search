import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import router from './router';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
  router, 
  render: h => h(App)
}).$mount('#app')
