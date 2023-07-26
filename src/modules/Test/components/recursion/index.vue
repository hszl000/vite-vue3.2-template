<template>
  <div>
    <el-table-v2
      v-model:expanded-row-keys="expandedRowKeys"
      :columns="columns"
      :data="treeData"
      :width="700"
      :expand-column-key="expandColumnKey"
      :height="400"
      fixed
      @row-expand="onRowExpanded"
      @expanded-rows-change="onExpandedRowsChange"
    />
    <el-table
      :data="recursionData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="id" label="id" sortable fixed="left" />
      <el-table-column type="selection" width="55" fixed="left" />
      <el-table-column prop="name" label="name" sortable />
      <el-table-column prop="value" label="value" sortable />
    </el-table>
  </div>
</template>

<script setup>
import { useRecursion } from "modules/Test/components/recursion/hooks"
const {
  recursionData,
  tableHeader,
  columns,
  expandColumnKey,
  treeData,
  expandedRowKeys,
  onRowExpanded,
  onExpandedRowsChange,
} = useRecursion()
</script>
