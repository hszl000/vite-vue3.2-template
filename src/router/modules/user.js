export default {
  path: '/user',
  name: 'ProjectUserLayout',
  meta: {
    title: 'user',
    icon:'el-icon-search',
    roles:'1'
  },
  component: () => import('@/components/Layout/pages/index.vue'),
  redirect: {
    name: 'ProjectPermissionList'
  },
  children: [
    {
      path: '/user/permissionList',
      name: 'ProjectPermissionList',
      meta: {
        title: 'permissionList',
        icon:'user',
        roles:'1-1'
      },
      component: () => import('@/modules/User/pages/permissionList.vue')
    },
    {
      path: '/user/personalList',
      name: 'ProjectPersonalList',
      meta: {
        title: 'personalList',
        icon:'user',
        roles:'1-2'
      },
      component: () => import('@/modules/User/pages/personalList.vue')
    },
    {
      path: '/user/roleList',
      name: 'ProjectRoleList',
      meta: {
        title: 'roleList',
        icon:'user',
        roles:'1-3',
      },
      component: () => import('@/modules/User/pages/roleList.vue')
    }
  ]
}