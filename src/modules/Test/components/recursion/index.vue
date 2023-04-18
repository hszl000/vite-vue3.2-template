<template>
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
</template>

<script setup>
import { useRecursion } from "modules/Test/components/recursion/hooks"
const {
  columns,
  expandColumnKey,
  treeData,
  expandedRowKeys,
  onRowExpanded,
  onExpandedRowsChange,
} = useRecursion()
</script>
