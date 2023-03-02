import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {createPinia} from 'pinia'
import 'vant/es/toast/style';
import 'animate.css';

const app = createApp(App)
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component:()=> import('./pages/Home.vue')},
        {path: '/login', component:()=> import('./pages/Login.vue')}
    ]
})
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
