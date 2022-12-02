<template>
  <div class="theme">
    <el-color-picker
      v-model="modelValue"
      :predefine="[
        '#409EFF',
        '#1890ff',
        '#304156',
        '#212121',
        '#11a983',
        '#13c2c2',
        '#6959CD',
        '#f5222d',
        '#1D561D',
      ]"
      class="theme-picker"
      popper-class="theme-picker-dropdown"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: () => "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<style lang="scss" scoped>
.theme {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
