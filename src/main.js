import Vue from 'vue';
import App from './App.vue';
import * as firebase from 'firebase/app';
import 'firebase/database';
import router from './router';
import VueMaterial from 'vue-material';
import VueYoutube from 'vue-youtube';
import 'vue-material/dist/vue-material.css';
import 'vue-material/dist/theme/default.css';
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(VueYoutube);

Vue.config.productionTip = false;

let app = '';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCGLyscMWTt5zBWBpOrC-xVkU86CrsS_7E",
  authDomain: "music-search-86cdd.firebaseapp.com",
  databaseURL: "https://music-search-86cdd.firebaseio.com",
  projectId: "music-search-86cdd",
  storageBucket: "music-search-86cdd.appspot.com",
  messagingSenderId: "337389619927"
};

firebase.initializeApp(config);

// Lorsqu'authentifier... affiche le contenu des pages
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
    router, 
    render: h => h(App)
    }).$mount('#app');
  }
});
