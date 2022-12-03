<template>
  <el-sub-menu :index="route.path" v-if="route.children.length > 0">
    <template #title>
      <menu-item
        :title="route.meta.title"
        :icon="route.meta.icon"
        :children="true"
      />
    </template>
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    />
  </el-sub-menu>
  <el-menu-item :index="route.path" v-else>
    <menu-item
      :title="route.meta.title"
      :icon="route.meta.icon"
      :children="false"
    />
    <!-- 由于单个导航必须要有插槽，就将插槽写在这里 -->
    <template #title>
      {{ getTitle(route.meta.title) }}
    </template>
  </el-menu-item>
</template>

<script setup>
import { ElSubMenu, ElMenuItem } from "element-plus";
import MenuItem from "@/components/Layout/components/Sidebar/MenuItem.vue";
import { getTitle } from "utils/lang.js";

defineProps({
  route: {
    type: Object,
    required: true,
  },
});
</script>

<style lang='scss' scoped>
.el-menu-item {
  --el-menu-hover-bg-color:var(--el-color-primary-light-7) !important;
  &.is-active {
    background: var(--el-color-primary-light-9);
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      content: "";
      background: var(--el-color-primary-light-5);
    }
  }

  .el-menu-tooltip__trigger {
    .icons {
      margin-right: 0;
    }
  }

  &:hover {
    background: var(--el-color-primary-light-7);
  }
}
</style>