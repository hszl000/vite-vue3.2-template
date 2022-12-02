<template>
  <div class="sidebar">
    <Logo class='logo' />
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useLayoutStore } from "comps/Layout/store";
import SidebarMenu from "@/components/Layout/components/Sidebar/SidebarMenu.vue";
import Logo from '@/components/Logo/index.vue'

const layoutStore = useLayoutStore();
</script>

<style lang='scss' scoped>
.sidebar {
  width: auto;
  .logo{
    padding: 0 10px;
  }

  :deep(.el-scrollbar) {
    height: calc(100vh - 60px);
  }
}
</style>