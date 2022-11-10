<template>
  <icon-font icon="change-theme" class="change-theme" @click="openTheme" />
</template>

<script setup>
import { getCurrentInstance } from "vue";
import SelectColor from "comps/ThemePicker/components/SelectColor.vue";
// import AAA from "comps/404.vue";

const { proxy } = getCurrentInstance();

import { ref, computed, watch } from "vue";
import { useLayoutStore } from "comps/Layout/store";
import {
  version,
  getThemeCluster,
  getCSSString,
  updateStyle,
  getHandler,
} from "utils/theme.js";
import { ElMessage } from "element-plus";

const layoutStore = useLayoutStore();

const chalk = ref(""); // content of theme-chalk css
const theme = ref(layoutStore.getThemeColor);

// ele default primary
const defaultTheme = computed(() => {
  return layoutStore.getOriginalTheme;
});

watch(
  () => layoutStore.getThemeColor,
  async (val, prevVal) => {
    console.log(val, prevVal);
    // 变更之前的颜色
    const oldVal = prevVal || theme.value;
    // 如果当前 颜色不是 string类型 return
    if (typeof val !== "string") return;
    // 生成当前颜色系列情景色
    const themeCluster = getThemeCluster(val.replace("#", ""));
    // 上次颜色其情景色
    const originalCluster = getThemeCluster(oldVal.replace("#", ""));
    console.log(themeCluster, originalCluster);

    if (!chalk.value) {
      const url = `https://unpkg.com/element-plus@${version.value}/dist/index.css`;
      await getCSSString(url);
    }

    const chalkHandler = getHandler(
      "chalk-style",
      defaultTheme.value,
      themeCluster
    );
    chalkHandler();

    const styles = [].slice
      .call(document.querySelectorAll("style"))
      .filter((style) => {
        const text = style.innerText;
        return (
          new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
        );
      });
    styles.forEach((style) => {
      const { innerText } = style;
      if (typeof innerText !== "string") return;
      style.innerText = updateStyle(innerText, originalCluster, themeCluster);
    });
  }
);

const openTheme = () => {
  proxy.$ModalDialog({
    title: proxy.$t("layout.themeName"),
    dialogWidth: "300px",
    isDark: true,
    renderComponent: {
      data: theme,
      component: SelectColor,
    },
    onConfirm: async (instance, proxy) => {
      // layoutStore.$patch((state) => {
      //   state.themeColor = theme.value;
      // });
      layoutStore.$patch({ themeColor: theme.value });
      ElMessage.success(proxy.$t("layout.theme"));
    },
  });
};
</script>

<style lang='scss' scoped>
.change-theme {
  width: 20px;
  height: 20px;
  padding: 10px;
}
</style>