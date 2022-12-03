import { defineAsyncComponent } from "vue";
import { useLocale } from "element-plus";
// 此插件替代 require('path')
import path from "path-browserify";
/**
 * 1.去除重复的二级路由，保持一二级路由的层级关系
 */

// 获取所有二级路由
const getChildrenRoutes = (routes) => {
  const result = [];
  routes.forEach((route) => {
    if (route.children && route.children.length) {
      result.push(...route.children);
    }
  });
  return result;
};
// 去除重复二级路由
export const filterRouter = (routes) => {
  // 获取所有二级路由
  const childrenRoutes = getChildrenRoutes(routes);
  console.log(childrenRoutes, "childrenRoutes");
  return routes.filter((route) => {
    return !childrenRoutes.find(
      (childrenRoute) => childrenRoute.name === route.name
    );
  });
};

/**
 * 2.将routes（filterRoute后的）为了配合v-for遍历生成菜单，需要格式化数据
 */

// 判断数据是否是空值
const isNull = (data) => {
  if (!data) return true;
  if (["{}", "[]"].includes(JSON.stringify(data))) return true;
  return false;
};
// 根据 routes 数据，返回对应 menu 规则数组
export const generateMenus = (routes, basePath = "") => {
  const result = [];
  // 遍历路由表
  routes.forEach((routeItem) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(routeItem.children) && isNull(routeItem.meta)) return;
    // 存在 children 不存在 meta 进入迭代
    if (!isNull(routeItem.children) && isNull(routeItem.meta)) {
      result.push(...generateMenus(routeItem.children));
      return;
    }

    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, routeItem.path);
    // 路由分离之后，存在同名父路由情况
    let route = result.find((route) => route.path === routePath);

    if (!route) {
      route = {
        ...routeItem,
        path: routePath,
        children: [],
      };
    }

    // icon 与 title 必须全部存在
    if (route.meta && route.meta.icon && route.meta.title) {
      // meta中 存在 icon and title 则放入 arr
      result.push(route);
    }

    if (routeItem.children) {
      route.children.push(...generateMenus(routeItem.children, route.path));
    }
  });
  return result;
};

/**
 * @param {function} flatteningRoutes
 * @description 路由扁平化
 */

export const flatteningRoutes = (routes, permission) => {
  const routes_ = routes.filter((route) =>
    route.meta.roles.some((role) => permission.includes(role))
  );
  routes_.forEach(
    (route) =>
      route.children &&
      (route.children = flatteningRoutes(route.children, permission))
  );
  // const errorPath = {
  //   path: "/:pathMatch(.*)*",
  //   name: "404",
  //   component: defineAsyncComponent(() => import("@/components/404.vue")),
  // };

  // routes_.push(errorPath);
  return routes_;
};
