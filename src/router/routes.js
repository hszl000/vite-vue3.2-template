import { defineAsyncComponent } from 'vue'

// 路由模块
import UserAccount from '@/router/modules/userAccount.js'
import Home from '@/router/modules/home.js'
import Test from '@/router/modules/test.js'
import User from '@/router/modules/user.js'

// 私有路由
export const PrivateRouites = [
  User
]
// 公有路由
export const PublicRoutes = [
  UserAccount,
  Home,
  Test,
]

export default [
  ...PublicRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: defineAsyncComponent(() => import('@/components/404.vue'))
  }
]