<template>
  <el-scrollbar>
    <div class="app-main">
      <router-view #default="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { useLayoutStore } from "comps/Layout/store";
// 检测当前路由是否存在黑名单中
import { isNoTag } from "utils/tag.js";
// 中英文 title 转换
import { getTitle as getTitle_, watchLang } from "utils/lang.js";
const route = useRoute();
const layoutStore = useLayoutStore();
// 获取title (将整个路由拿来判断)
const getTitle = (to) => {
  if (!to.meta || !to.meta.title) {
    // 如果不存在title 就以path最后一项作为 title
    const tem = to.path.split("/").reverse();
    return tem[0];
  } else {
    // 如果存在title
    return getTitle_(to.meta.title);
  }
};
// 监听当前路由的变化 (初始化也要执行),增加tag到指定位置
watch(
  route,
  (to, from) => {
    // 检测当前路由是否存在黑名单中 (如果存在 不合法，不执行)
    if (isNoTag(to.path)) return;
    // 合法tag
    const { path, fullPath, meta, name, params, query } = to;
    // 增加一个 tag 到vuex中
    layoutStore.addTagViewList({
      path,
      fullPath,
      meta,
      name,
      params,
      query,
      title: getTitle(to), // 将整个路由传过去（去做加工）
    });
  },
  { immediate: true }
);
// 封装好的 watch监听 语言切换（更改顶部导航语言数据）
watchLang(() => {
  nextTick(() => {
    const tmpArr = layoutStore.tagViewList.map((route) => {
      return { ...route, title: getTitle(route) };
    });
    layoutStore.changeTitle(tmpArr);
  });
});
</script>

<style lang='scss' scoped>
.el-scrollbar {
  height: calc(100% - 34px);
  .app-main {
    height: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    overflow-x: hidden;
  }
}
</style>