import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Catalog from '../views/Catalog.vue'
import CStore from '../views/CStore.vue'
import Course from '../views/Course.vue'
import Author from '../views/Author.vue'
import Lk from '../views/Lk.vue'
import Saved from '../views/Saved.vue'
import SearchCatalog from '../views/SearchCatalog.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/cstore',
    name: 'CStore',
    component: CStore
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: Course
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/author/:id',
    name: 'Author',
    component: Author
  },
  {
    path: '/lk',
    name: 'Lk',
    component: Lk
  },
  {
    path: '/saved',
    name: 'Saved',
    component: Saved
  },
  {
    path: '/searchcatalog',
    name: 'SearchCatalog',
    component: SearchCatalog
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
})

export default router
