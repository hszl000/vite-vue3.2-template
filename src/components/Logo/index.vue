<template>
  <router-link to="/" class="headline">
    <img src="@/assets/images/logo3x.png" alt="logo" class="logo">

    <h4
      v-if="layoutStore.getSideBarOpen || ['top'].includes(layoutFormat)"
      class="logo-title"
    >
      {{ $t("layout.title") }}
    </h4>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useLayoutStore } from "comps/Layout/store";
const layoutStore = useLayoutStore();
// 当前布局
const layoutFormat = computed(() => layoutStore.getLayoutFormat);
</script>

<style lang='scss' scoped>
.headline {
  box-sizing: border-box;
  height: 60px;
  border-bottom: 1px solid var(--el-color-primary-light-3);
  padding: 0px 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  .logo {
    width: 50px;
    height: 28px;
  }
  .logo-title {
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    margin-left: 15px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>