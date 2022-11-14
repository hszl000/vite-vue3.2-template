<template>
  <div class="navbar" v-if="['left'].includes(layoutFormat)">
    <div class="left-menu">
      <!-- 缩放侧边栏 -->
      <Cuttle />
      <!-- 动态面包屑 -->
      <Breadcrunb />
    </div>
    <div class="right-menu">
      <!-- 全屏切换组件 -->
      <ScreenFull />
      <!-- 主题换肤 -->
      <ThemePicker />
      <!-- 国际化 -->
      <SelectLang />
      <!-- 消息 -->
      <News />
      <!-- 当前用户 -->
      <ActiveUser />
    </div>
  </div>
  <div class="navbar" v-else>
    <div class="left-menu">
      <!-- logo -->
      <Logo />
    </div>
    <SidebarMenu v-if="['top'].includes(layoutFormat)" />
    <div class="right-menu">
      <!-- 全屏切换组件 -->
      <ScreenFull />
      <!-- 主题换肤 -->
      <ThemePicker />
      <!-- 国际化 -->
      <SelectLang />
      <!-- 消息 -->
      <News />
      <!-- 当前用户 -->
      <ActiveUser />
    </div>
  </div>
</template>

<script setup>
import Cuttle from "comps/Cuttle/index.vue";
import Breadcrunb from "comps/Breadcrunb/index.vue";
import ScreenFull from "comps/ScreenFull/index.vue";
import ThemePicker from "comps/ThemePicker/index.vue";
import SelectLang from "comps/SelectLang/index.vue";
import ActiveUser from "comps/ActiveUser/index.vue";
import SidebarMenu from "comps/Layout/components/Sidebar/SidebarMenu.vue";
import Logo from "comps/Logo/index.vue";
import News from "comps/News/index.vue";
import { useLayoutStore } from "comps/Layout/store";
import { computed } from "vue";

const layoutStore = useLayoutStore();
const layoutFormat = computed(() => layoutStore.getLayoutFormat);
</script>

<style lang='scss' scoped>
.navbar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-menu {
    display: flex;
    align-items: center;
    .cuttle_container {
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .breadcrumb {
      margin: 0px 10px;
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    .screen-full {
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .change-theme {
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>