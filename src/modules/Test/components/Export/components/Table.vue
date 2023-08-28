<template>
  <el-table :="$attrs" ref="table">
    <TableColumn v-for="{children,...rest} in $attrs.tableHeade" :key="rest.label" :children="children" :="rest"  />
  </el-table>
</template>

<script setup>
import {ref} from 'vue'
import TableColumn from 'modules/Test/components/Export/components/TableColumn.vue'

const table = ref();

defineExpose({
  table
})
</script>

  <style lang='scss' scoped></style>