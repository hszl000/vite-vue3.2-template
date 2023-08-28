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
      path: 'test1',
      name: 'ProjectTest',
      meta: {
        title: 'test1',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/pages/index.vue')
    },
    {
      path: 'guide',
      name: 'ProjectGuide',
      meta: {
        title: 'guide',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/guide/index.vue')
    },
    {
      path: 'wangEditor',
      name: 'ProjectWangEditor',
      meta: {
        title: 'wangEditor',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/wangEditor/index.vue')
    },
    {
      path: 'numComma',
      name: 'ProjectNumComma',
      meta: {
        title: 'numComma',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/numComma/index.vue')
    },
    {
      path: 'activiti',
      name: 'ProjectActiviti',
      meta: {
        title: 'activiti',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/activiti/index.vue')
    },
    {
      path: 'recursion',
      name: 'ProjectRecursion',
      meta: {
        title: 'recursion',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/recursion/index.vue')
    },
    {
      path: 'export',
      name: 'Export',
      meta: {
        title: 'export',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/Export/index.vue')
    },
    {
      path: 'notification',
      name: 'Notification',
      meta: {
        title: 'notification',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Test/components/Notification/index.vue')
    },

  ]
}