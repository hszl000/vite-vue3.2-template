<template>
  <div class="sidebar">
    <div class="headline">
      <el-avatar
        shape="square"
        :size="40"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <transition name="fide">
        <h4 class="logo-title" v-if="layoutStore.getSideBarOpen">
          {{ $t("layout.title") }}
        </h4>
      </transition>
    </div>
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useLayoutStore } from "comps/Layout/store";
import { ElAvatar, ElScrollbar } from "element-plus";
import SidebarMenu from "@/components/Layout/components/Sidebar/SidebarMenu.vue";

const layoutStore = useLayoutStore();
</script>

<style lang='scss' scoped>
.sidebar {
  width: auto;
  .headline {
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px solid #282a35;
    padding: 0px 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    .logo-title {
      color: #fff;
      margin-left: 10px;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      white-space: nowrap;
    }
    :deep(.el-avatar) {
      // --el-avatar-background-color: none;
    }
  }
  :deep(.el-scrollbar) {
    height: calc(100vh - 60px);
  }
}
</style>