import { defineAsyncComponent } from "vue";

// 路由模块
import UserAccount from "@/router/modules/userAccount.js";
import Home from "@/router/modules/home.js";
import permissionConfig from "@/router/modules/permissionConfig.js";
import Test from "@/router/modules/test.js";
import Study from "@/router/modules/study";

// 私有路由
export const PrivateRouites = [permissionConfig];
// 公有路由
export const PublicRoutes = [UserAccount, Home, Test, Study];

export default [
  ...PublicRoutes,
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: '404',
  //   component: defineAsyncComponent(() => import('@/components/404.vue'))
  // }
];
