<template>
  <div>
    <el-button @click="handleExport">导出</el-button>
    <Table :tableHeade="tableHeade" :data="tableData" style="width: 100%" highlight-current-row ref="table"  />
    <br>
    <Table :tableHeade="tableHeade2" :data="tableData2" style="width: 100%" highlight-current-row ref="table2"/>
  </div>
</template>

<script setup>
import { ref,unref } from 'vue'
import axios from 'axios'
import Table from 'modules/Test/components/Export/components/Table.vue'
import {tableHeade,tableHeade2} from 'modules/Test/components/Export/data/index'
import { useExport } from 'modules/Test/components/Export/hooks/useExport'

const {exportXlsx} = useExport();

const table = ref()
const table2 = ref()

const tableData = ref([])
const tableData2 = ref([])

const initData =async ()=>{
  const {data:{error,value}} = await axios.get('/src/modules/Test/components/Export/data/index.json')

  if(!error){
    tableData.value = value.data['H1000-Note-01-01']
    tableData2.value = value.data['H1000-Note-06']

  }
}
initData()

const handleExport = ()=>{
  exportXlsx([unref(table).$el,unref(table2).$el])
}
</script>

<style lang='scss' scoped></style>