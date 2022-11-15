export default {
  path: "/",
  name: "ProjectLayout",
  component: () => import("@/components/Layout/pages/index.vue"),
  redirect: {
    name: "Home",
  },
  children: [
    {
      path: "/home",
      name: "Home",
      meta: {
        title: "home",
        icon: "home",
        roles: [],
      },
      component: () => import("@/modules/Home/pages/index.vue"),
    },
  ],
};
