<template>
  <el-button @click="exportFile">下载</el-button>
</template>

<script setup name="XlsxExample">
import { utils, writeFileXLSX } from 'xlsx'
import MergeCell from './MergeCell.js'
import {tableHeade} from 'modules/Test/components/Export/data/index'

const props = defineProps({
  data:{
    type:Array,
    default:()=>([])
  },
  tableHeade:{
    type:Array,
    required:true
  },
})

// 导出多表头结构
function exportFile() {
  const ws = utils.json_to_sheet([])
  const { headerValue, headerMerge, bodyValue, deep } = new MergeCell(
    props.tableHeade,
    props.data
  )
  ws['!merges'] = headerMerge

  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Data')
  utils.sheet_add_aoa(ws, headerValue, { origin: 'A1' }) // 将js数据转换为工作表
  utils.sheet_add_aoa(ws, bodyValue, { origin: `A${deep + 2}` }) // 将js数据转换为工作表

  console.log(headerValue,'headerValue')
  console.log(headerMerge,'headerValue')
  console.log(bodyValue,'bodyValue')

  writeFileXLSX(wb, `${new Date().getTime()}.xlsx`)
}
</script>