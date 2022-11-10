import {createRouter,createWebHistory} from 'vue-router'
import routes from '@/router/routes.js'

export default createRouter({
  history:createWebHistory(import.meta.env.BASE_URL),
  routes
})