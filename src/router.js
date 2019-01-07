import * as firebase from 'firebase/app';
import 'firebase/database';
import Vue from "vue"
import Router from 'vue-router'
import Index from './components/Index.vue'
import Gestion from './components/Gestion.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signUp',
            name: 'signUp',
            component: SignUp
        },
        {
            path: '/accueil',
            name: 'index',
            component: Index,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/gestion',
            name: 'gestion',
            component: Gestion,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if(requiresAuth && !currentUser) next('login');
    else if(!requiresAuth && currentUser) next ('accueil');
    else next();
});

export default router;