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

// reference à la db firebase
//var database = firebase.database();
//var userId = database.auth().currentUser.uid;
//var firebaseRef = fi5rebase.database().ref();
//firebaseRef.push().set("test value");

/* basic add request */
/*
firebase.database().ref('playlist').push().set({
  nom: "flute",
  videos: [
    "id vid 1",
    "id vid 2"
  ]
});
*/

/* basic get request */
/*
const objParent = firebase.database().ref().child('playlist');
objParent.on('value', snap => console.log(snap.val()));
*/

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
    router, 
    render: h => h(App)
    }).$mount('#app');
  }
});
