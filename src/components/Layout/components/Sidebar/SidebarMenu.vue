<template>
  <!-- 菜单 -->
  <el-menu
    :background-color="backgroundMenu"
    :text-color="textMenu"
    :active-text-color="activeMenu"
    :default-active="activePath"
    unique-opened
    router
    ellipsis
    :mode='["left"].includes(layoutFormat)?"vertical":"horizontal"'
    :collapse='!sideBarOpen && ["left"].includes(layoutFormat)'
  >
  <!-- mode='' horizontal or vertical -->
    <!-- 菜单展示组件（一二级） -->
    <SidebarItem v-for="route in routes" :key="route.path" :route="route" />
  </el-menu>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLayoutStore } from "comps/Layout/store";
import { filterRouter, generateMenus } from "@/utils/router.js";
import SidebarItem from "@/components/Layout/components/Sidebar/SidebarItem.vue";

const router = useRouter();
const route = useRoute();

const layoutStore = useLayoutStore();

/**
 * 菜单颜色配置
 */
// 获取菜单背景颜色
const backgroundMenu = computed(() => "var(--el-color-primary)");
// 获取菜单文字颜色
const textMenu = computed(() => "var(--el-color-primary-light-8)");
// 获取选中菜单颜色
const activeMenu = computed(() => "var(--el-color-primary-light-5)");

/**
 * 获取到当前路由,
 * 作为默认展示的菜单
 */
const activePath = computed(() => route.path);

/**
 * 获取所有路由，作为菜单展示
 */
const routes = computed(() => {
  const filterRoutes = filterRouter(router.getRoutes());
  return generateMenus(filterRoutes);
});

// 菜单伸缩
const sideBarOpen = computed(() => {
  return layoutStore.getSideBarOpen;
});
// 当前布局
const layoutFormat = computed(()=>layoutStore.getLayoutFormat)
</script>

<style lang='scss' scoped>
.el-menu {
  border-right: 1px solid var(--el-color-primary);
  border-bottom: none;

  .el-sub-menu{
    .el-menu-tooltip__trigger {
      .icons {
        margin-right: 0;
      }
    }
  }
}
</style>