<template>
<div>
  <TableExport :tableHeade="tableHeade" :data="tableData" />
  <TableExport :tableHeade="tableHeade2" :data="tableData2" />
</div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'
import TableExport from 'modules/Test/components/Export/components/TableExport.vue'
import {tableHeade,tableHeade2} from 'modules/Test/components/Export/data/index'

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
</script>

<style lang='scss' scoped></style>