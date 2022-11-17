<template>
  <svg aria-hidden="true" :style="style">
    <use :xlink:href="iconName" :fill="fill" />
  </svg>
</template>
<script setup>
import {defineProps,computed} from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  fill: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  }
})

const style = {
  fontSize: props.size,
  color: props.color
}

const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style>
svg {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  /* color: var(--el-color-primary-light-5); */
}
</style>
