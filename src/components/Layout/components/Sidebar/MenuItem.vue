<template>
  <!-- elemet icon -->
  <!-- <i :class="icon" v-if="icon.includes('el-icon')" /> -->
  
  <el-icon >
    <component v-if="icon.includes('el-icon')" :is='icon' />
    <!-- 自定义 icon -->
    <icon-font v-else :icon="icon" class="icons" />
  </el-icon>
  <span v-if="children">{{ getTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from "vue";
import { getTitle } from "utils/lang.js";
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  children: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang='scss' scoped>
.icons {
  width: 18px;
  height: 18px;
  // margin-right: 5px;
  vertical-align: middle;
}
</style>