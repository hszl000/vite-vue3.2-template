export default {
  path: '/login',
  name: 'ProjectLogin',
  meta: {
    title: 'login'
  },
  component: () => import('@/modules/UserAccount/pages/login.vue')
}