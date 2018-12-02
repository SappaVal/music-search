import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import router from './router';
import VueMaterial from 'vue-material'
import VueYoutube from 'vue-youtube'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VueYoutube)
Vue.use(VeeValidate)
Vue.config.productionTip = false

new Vue({
  router, 
  render: h => h(App)
}).$mount('#app')
