<template>
  <el-container :class="layoutStore.getSideBarOpen ? '' : 'hideSidebar'">
    <el-aside id="guide-sidebar" class="siderbar-container" v-if='["left"].includes(layoutFormat)'>
      <SideBar />
    </el-aside>
    <el-container class="main-container">
      <el-header :style='{background:["top"].includes(layoutFormat)?"var(--el-color-primary)":""}'>
        <Navbar />
      </el-header>
      <el-main>
        <TagView v-if='["left"].includes(layoutFormat)' />
        <Appmain />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { computed } from "vue";
import { useLayoutStore } from "comps/Layout/store";
import { ElContainer, ElAside, ElHeader, ElMain } from "element-plus";
// 侧边栏组件
import SideBar from "@/components/Layout/components/Sidebar/index.vue";
// main组件
import Appmain from "@/components/Layout/components/Appmain/index.vue";
import Navbar from "@/components/Layout/components/Navbar/index.vue";
import TagView from "comps/TagView/index.vue";

const layoutStore = useLayoutStore();
const asideBg = computed(() => "#008000");
const layoutFormat = computed(() => layoutStore.getLayoutFormat);
</script>

<style lang='scss' scoped>
@import "@/styles/variables.scss";
.el-container {
  height: 100vh;

  .el-aside {
    transition: width 0.3s;
    width: $sideBarWidth;
    background: var(--el-color-primary);
  }

  .main-container{
    flex:1;
  }

  .el-container.is-vertical {
    .el-header {
      padding: 0px 10px;
    }

    :deep(.el-main) {
      padding: 0;
      background: #f0f2f5;
      min-height: calc(100vh - 60px);
    }
  }
}

.el-container.hideSidebar {
  .el-aside {
    width: $sideBarhideWidth;
  }
}
</style>