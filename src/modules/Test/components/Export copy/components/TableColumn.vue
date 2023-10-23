<template>
  <el-table-column v-bind="$attrs" align="center">
    <template v-if="children?.length">
      <TableColumn v-for="{children,...rest} in children" :key="rest.label" :children="children" :="rest" />
    </template>
  </el-table-column>
</template>

<script setup>
import TableColumn from 'modules/Test/components/Export/components/TableColumn.vue'
defineProps({
  children:{
    type:Object,
    required:true
  }
})
</script>

<style lang='scss' scoped></style>