import Vue from "vue"
import Router from 'vue-router'
import Index from './components/Index.vue'
import Gestion from './components/Gestion.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/gestion',
            name: 'gestion',
            component: Gestion
        }
    ]
})