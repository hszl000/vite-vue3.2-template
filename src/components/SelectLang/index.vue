<template>
  <el-dropdown trigger="click" @command="selectLang">
    <icon-font icon="language" class="language" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="layoutStore.getLanguage === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref, getCurrentInstance, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "comps/Layout/store";
const { proxy } = getCurrentInstance();

const layoutStore = useLayoutStore();
const { language } = storeToRefs(layoutStore);

const languageList = ref([
  {
    value: "zh",
    label: "中文",
  },
  {
    value: "en",
    label: "English",
  },
]);

const selectLang = (lang) => {
  language.value = lang;

  nextTick(() => {
    ElMessage({
      type: "success",
      message: proxy.$t("layout.toggleLang"),
    });
  });
};
</script>

<style lang='scss' scoped>
.language {
  width: 20px;
  height: 20px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>