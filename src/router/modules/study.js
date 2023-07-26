export default {
  path: '/study',
  name: 'ProjectStudyLayout',
  meta: {
    title: 'study',
    icon:'user'
  },
  component: () => import('@/components/Layout/pages/index.vue'),
  redirect: {
    name: 'ProjectStudy'
  },
  children: [
    {
      path: 'reactive',
      name: 'ProjectStudy',
      meta: {
        title: 'ProxyAndReflect',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Study/pages/index.vue')
    },
    {
      path: 'set',
      name: 'ProjectSet',
      meta: {
        title: 'set',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Study/pages/Set.vue')
    },
    {
      path: 'map',
      name: 'ProjectMap',
      meta: {
        title: 'map',
        icon:'user',
        roles:[]
      },
      component: () => import('@/modules/Study/pages/Map.vue')
    }
  ]
}