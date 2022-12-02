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
    },
    {
      path: '/test/guide',
      name: 'ProjectGuide',
      meta: {
        title: 'guide',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/guide/index.vue')
    },
    {
      path: '/test/wangEditor',
      name: 'ProjectWangEditor',
      meta: {
        title: 'wangEditor',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/wangEditor/index.vue')
    },
    {
      path: '/test/numComma',
      name: 'ProjectNumComma',
      meta: {
        title: 'numComma',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/numComma/index.vue')
    }
  ]
}