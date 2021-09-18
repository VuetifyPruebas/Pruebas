import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import formulariobasico from '../views/formulariobasico.vue'
import formulariovalidar from '../views/formulariovalidar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calendario',
    name: 'calendario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/calendario.vue')
  },
  {
    path: '/alerta',
    name: 'Alertas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Alertas.vue')
  },
  {
    path: '/oscuro',
    name: 'temaOscuro',
    component: () => import(/* webpackChunkName: "about" */ '../views/temaOscuro.vue')
  },
   {
    path: '/botones',
    name: 'botones',
    component: () => import(/* webpackChunkName: "about" */ '../views/botones.vue')
   },
   {
    path: '/btnForm',
    name: 'btnform',
    component: () => import(/* webpackChunkName: "about" */ '../views/btnform.vue')
  },
   {
    path: '/menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: "about" */ '../views/menu.vue')
  },
  {
    path: '/menu2',
    name: 'menu2',
    component: () => import(/* webpackChunkName: "about" */ '../views/menu2.vue')
  },
  {
    path: '/footer',
    name: 'footer',
    component: () => import(/* webpackChunkName: "about" */ '../views/footer.vue')
  },
  {
    
    path: '/form',
    name: 'formulariobasico',
    component: formulariobasico
  },
  {
    
    path: '/formValidar',
    name: 'formulariovalidar',
    component: formulariovalidar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
