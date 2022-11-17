<template>
  <icon-font
    :icon="isScreenFull ? 'exit-fullscreen' : 'fullscreen'"
    class="screen-full"
    @click="toggleScreenFull"
  />
</template>

<script setup>
import { ref } from "vue";
import screenfull from "screenfull";

const isScreenFull = ref(false);

const toggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value;
  // 使用 screenfull 插件来完成全屏的切换
  screenfull.toggle(); // 默认将 body 切换全屏
};
</script>

<style lang='scss' scoped>
.screen-full {
  width: 20px;
  height: 20px;
  padding: 10px;
  color: var(--el-color-primary-light-7);
}
</style>