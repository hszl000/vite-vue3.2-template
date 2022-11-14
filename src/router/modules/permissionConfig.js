export default {
  path: "/config",
  name: "ProjectConfig",
  meta: {
    title: "systemLayout",
    icon: "user",
    roles: ["4"],
  },
  component: () => import("@/components/Layout/pages/index.vue"),
  redirect: {
    name: "ProjectPermissionConfig",
  },
  children: [
    // 权限配置
    {
      path: "/config/permissionconfig",
      name: "ProjectPermissionConfig",
      meta: {
        title: "permissionConfig",
        icon: "user",
        roles: ["4-2"],
      },
      component: () =>
        import("@/modules/permissionConfig/pages/Permission.vue"),
    },
    // 新建
    {
      path: "/config/newPermission",
      name: "newPermission",
      meta: {
        title: "newPermission",
        roles: ["4-2-1", "4-2-2"],
      },
      component: () => import("@/modules/NewPermission/pages/create.vue"),
    },
  ],
};
