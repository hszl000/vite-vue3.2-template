<template>
  <div>
    <button @click="exportExcel">导出Excel</button>
  </div>
</template>

<script setup>
import {utils,write} from 'xlsx';
import FileSaver from 'file-saver';
import {tableHeade} from 'modules/Test/components/Export/data/index'

const map = new Map()
const getCellsSize = list => {
  if (map.has(list)) { return map.get(list) }
  if (list?.length) {
    let rows = -1, cols = list.length - 1
    list.forEach(item => {
      if (item.children && item.children?.length) {
        const size = getCellsSize(item.children)
        rows = Math.max(size[0], rows)
        cols += size[1]
      }
    })
    map.set(list, [rows + 1, cols])
    return [rows + 1, cols]
  }
}

const size = getCellsSize(tableHeade)
const headerMerge = []
const mergeHeadersCell = (headers, row, col) => {
  for (let i = 0, len = headers.length;i < len;i++) {
    const cell = headers[i]
    if (!cell.children?.length) {
      if (row === size[0]) { continue }
      headerMerge.push({ s: { r: row, c: col + i }, e: { r: size[0], c: col + i } })
    } else {
      const size = map.get(cell.children)
      headerMerge.push({ s: { r: row, c: col + i }, e: { r: row, c: col + size[1] + i }})
      mergeHeadersCell(cell.children, row + 1, col + i)
      col += size[1]
    }
  }
}

mergeHeadersCell(tableHeade,size[0],size[1])
console.log(headerMerge,'headerMerge')

const exportExcel = () => {
  // 数据源
  const data = [
    // {
    //   name: '姓名',
    //   age: '年龄',
    //   job: '职业'
    // },
    // {
    //   name: '张三',
    //   age: 23,
    //   job: '程序员'
    // },
    // {
    //   name: '李四',
    //   age: 30,
    //   job: '设计师'
    // },
    // {
    //   name: '王五',
    //   age: 35,
    //   job: '经理'
    // }
  ];

  // 表头
  // const headers = Object.keys(data[0]);

  // 创建工作表
  const worksheet = utils.json_to_sheet(data, { header: [] });

  // 创建工作簿
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 合并单元格
  const mergedRegions = headerMerge
  workbook.Sheets["Sheet1"]["!merges"] = mergedRegions;

  // 转换为二进制数据
  const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });

  // 创建Blob对象并保存文件
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, 'data.xlsx');
}
</script>