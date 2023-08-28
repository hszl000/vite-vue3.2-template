<template>
  <div>
    <test :='$props' />
    <el-table :data="data" style="width: 100%" highlight-current-row>
      <TableColumn v-for="{children,...rest} in tableHeade" :key="rest.label" :children="children" :="rest"  />
    </el-table>
  </div>
  </template>

<script setup>
import TableColumn from 'modules/Test/components/Export/components/TableColumn.vue'
import test from 'modules/Test/components/Export/components/test.vue'
defineProps({
  tableHeade:{
    type:Array,
    required:true
  },
  data:{
    type:Array,
    default:()=>([])
  }
})
</script>

  <style lang='scss' scoped></style>