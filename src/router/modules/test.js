export default {
  path: '/test',
  name: 'ProjectTestLayout',
  meta: {
    title: 'test',
    icon:'user'
  },
  component: () => import('@/components/Layout/pages/index.vue'),
  redirect: {
    name: 'ProjectTest'
  },
  children: [
    {
      path: '/test/test1',
      name: 'ProjectTest',
      meta: {
        title: 'test1',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/pages/index.vue')
    }
  ]
}