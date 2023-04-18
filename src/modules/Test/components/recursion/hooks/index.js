import { ref, computed } from 'vue'
import { recursionData, tableHeader, viewKey } from 'modules/Test/components/recursion/data'
import { TableV2FixedDir } from 'element-plus'
export const useRecursion = () => {

  const generateColumns = (length = 10, prefix = 'column-', props) =>
    tableHeader.map((item, columnIndex) => ({
      ...props,
      key: `${prefix}${columnIndex}`,
      dataKey: `${prefix}${columnIndex}`,
      title: item.title,
      width: 150,
    }))

  const generateData = (
    columns,
    length = 200,
    prefix = 'row-'
  ) =>
    recursionData.map((item, rowIndex) => {
      return columns.reduce(
        (rowData, column, columnIndex) => {
          console.log(rowData, column, columnIndex, 'rowData, column, columnIndex')
          rowData[column.dataKey] = item[viewKey[columnIndex]]
          return rowData
        },
        {
          id: `${prefix}${rowIndex}`,
          parentId: null,
        }
      )
    })

  const columns = generateColumns(10).map((column, columnIndex) => {
    let fixed
    if (columnIndex < 2) fixed = TableV2FixedDir.LEFT
    if (columnIndex > 8) fixed = TableV2FixedDir.RIGHT
    return { ...column, fixed }
  })
  console.log(columns, 'columns')

  const data = generateData(columns, 10)
  console.log(data, 'data')

  const expandColumnKey = 'column-0'

  // add some sub items
  for (let i = 0; i < 5; i++) {
    data.push(
      {
        ...data[0],
        id: `${data[0].id}-sub-${i}`,
        parentId: data[0].id,
        [expandColumnKey]: `Sub ${i}`,
      },
      {
        ...data[2],
        id: `${data[2].id}-sub-${i}`,
        parentId: data[2].id,
        [expandColumnKey]: `Sub ${i}`,
      },
      {
        ...data[2],
        id: `${data[2].id}-sub-sub-${i}`,
        parentId: `${data[2].id}-sub-${i}`,
        [expandColumnKey]: `Sub-Sub ${i}`,
      }
    )
  }

  function unflatten(
    data,
    rootId = null,
    dataKey = 'id',
    parentKey = 'parentId'
  ) {
    const tree = []
    const childrenMap = {}

    for (const datum of data) {
      const item = { ...datum }
      const id = item[dataKey]
      const parentId = item[parentKey]

      if (Array.isArray(item.children)) {
        childrenMap[id] = item.children.concat(childrenMap[id] || [])
      } else if (!childrenMap[id]) {
        childrenMap[id] = []
      }
      item.children = childrenMap[id]

      if (parentId !== undefined && parentId !== rootId) {
        if (!childrenMap[parentId]) childrenMap[parentId] = []
        childrenMap[parentId].push(item)
      } else {
        tree.push(item)
      }
    }

    return tree
  }

  const treeData = computed(() => unflatten(data))

  const expandedRowKeys = ref([])

  const onRowExpanded = ({ expanded }) => {
    console.log('Expanded:', expanded)
  }

  const onExpandedRowsChange = (
    expandedKeys
  ) => {
    console.log(expandedKeys)
  }

  return {
    columns,
    expandColumnKey,
    treeData,
    expandedRowKeys,
    onRowExpanded,
    onExpandedRowsChange

  }
}