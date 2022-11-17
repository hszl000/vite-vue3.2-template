<template>
  <el-config-provider :locale="lang">
    <router-view />
  </el-config-provider>
</template>

<script setup>
// element-plus的语言包
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
// 自定义语言包
import selfZh from "@/language/zh.js";
import selfEn from "@/language/en.js";
import { computed } from "vue";
import { useLayoutStore } from "comps/Layout/store";

const layoutStore = useLayoutStore();

const lang = computed(() => {
  const locale = layoutStore.getLanguage;
  if (locale === "zh") {
    return {
      ...zhCn,
      ...selfZh,
    };
  } else {
    return {
      ...en,
      ...selfEn,
    };
  }
});
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>