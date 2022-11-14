<template>
  <el-breadcrumb class="breadcrumb" vseparator="/">
    <transition-group name="list" tag="p">
      <el-breadcrumb-item
        v-for="(route, index) in breadcrumbData"
        :key="route.path"
      >
        <!-- 判断最后一项不能点 -->
        <span v-if="index === breadcrumbData.length - 1">
          {{ getTitle(route.meta.title) }}
        </span>
        <a v-else @click="onLinkClick(route.path)">
          {{ getTitle(route.meta.title) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { watch, ref } from "vue";
import { getTitle } from "utils/lang.js";

const router = useRouter();
const route = useRoute();

const breadcrumbData = ref([]);

watch(
  () => route,
  () => {
    breadcrumbData.value = route.matched.filter((item) => {
      return item.meta && item.meta.title;
    });
  },
  {
    immediate: true,
    deep: true,
  }
);
const onLinkClick = (path) => {
  router.push({ path });
};
</script>

<style lang='scss' scoped>
.breadcrumb {
  display: inline-block;
  margin-left: 8px;
  // .no-redirect {
  // }
  .redirect {
    font-weight: 600;
    color: #666;
    cursor: pointer;
  }
}
</style>