<template>
  <div class="cuttle_container" @click="handleSideBar">
    <icon-font :icon="getIcon" class="icon-cuttle" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "comps/Layout/store";

const layoutStore = useLayoutStore();

const { toggleSideBar } = storeToRefs(layoutStore);

const getIcon = computed(() => {
  return layoutStore.getSideBarOpen ? "cuttle_open" : "cuttle_close";
});

const handleSideBar = () => {
  toggleSideBar.value = !toggleSideBar.value;
};
</script>

<style lang='scss' scoped>
.icon-cuttle {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  padding: 10px;
  color: var(--el-color-primary-light-7);
}
</style>