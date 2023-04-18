export const recursionData = [
  {
    id: '001',
    name: '测试-001',
    value: 'test-001',
    children: [
      {
        id: '001-1',
        name: '测试-001-1',
        value: 'test-001-1',
        parentId: '001',
        children: [
          {
            id: '001-1-1',
            name: '测试-001-1-1',
            value: 'test-001-1-1',
            parentId: '001-1',
          },
          {
            id: '001-1-2',
            name: '测试-001-1-2',
            value: 'test-001-1-2',
            parentId: '001-1',
          },
          {
            id: '001-1-3',
            name: '测试-001-1-3',
            value: 'test-001-1-3',
            parentId: '001-1',
          }
        ]
      },
      {
        id: '001-2',
        name: '测试-001-2',
        value: 'test-001-2',
        parentId: '001',
        children: [
          {
            id: '001-2-1',
            name: '测试-001-2-1',
            value: 'test-001-2-1',
            parentId: '001-2',
          },
          {
            id: '001-2-2',
            name: '测试-001-2-2',
            value: 'test-001-2-2',
            parentId: '001-2',
          },
          {
            id: '001-2-3',
            name: '测试-001-2-3',
            value: 'test-001-2-3',
            parentId: '001-2',
          }
        ]
      },
      {
        id: '001-3',
        name: '测试-001-3',
        value: 'test-001-3',
        parentId: '001',
        children: [
          {
            id: '001-3-1',
            name: '测试-001-3-1',
            value: 'test-001-3-1',
            parentId: '001-3',
          },
          {
            id: '001-3-2',
            name: '测试-001-3-2',
            value: 'test-001-3-2',
            parentId: '001-3',
          },
          {
            id: '001-3-3',
            name: '测试-001-3-3',
            value: 'test-001-3-3',
            parentId: '001-3',
          }
        ]
      }
    ]
  },
  {
    id: '002',
    name: '测试-002',
    value: 'test-002',
    parentId: '002',
    children: [
      {
        id: '002-1',
        name: '测试-002-1',
        value: 'test-002-1',
        children: [
          {
            id: '002-1-1',
            name: '测试-002-1-1',
            value: 'test-002-1-1',
          },
          {
            id: '002-1-2',
            name: '测试-002-1-2',
            value: 'test-002-1-2',
          },
          {
            id: '002-1-3',
            name: '测试-002-1-3',
            value: 'test-002-1-3',
          }
        ]
      },
      {
        id: '002-2',
        name: '测试-002-2',
        value: 'test-002-2',
        children: [
          {
            id: '002-2-1',
            name: '测试-002-2-1',
            value: 'test-002-2-1',
          },
          {
            id: '002-2-2',
            name: '测试-002-2-2',
            value: 'test-002-2-2',
          },
          {
            id: '002-2-3',
            name: '测试-002-2-3',
            value: 'test-002-2-3',
          }
        ]
      },
      {
        id: '002-3',
        name: '测试-002-3',
        value: 'test-002-3',
        children: [
          {
            id: '002-3-1',
            name: '测试-002-3-1',
            value: 'test-002-3-1',
          },
          {
            id: '002-3-2',
            name: '测试-002-3-2',
            value: 'test-002-3-2',
          },
          {
            id: '002-3-3',
            name: '测试-002-3-3',
            value: 'test-002-3-3',
          }
        ]
      }
    ]
  },
  {
    id: '003',
    name: '测试-003',
    value: 'test-003',
    children: [
      {
        id: '003-1',
        name: '测试-003-1',
        value: 'test-003-1',
        children: [
          {
            id: '003-1-1',
            name: '测试-003-1-1',
            value: 'test-003-1-1',
          },
          {
            id: '003-1-2',
            name: '测试-003-1-2',
            value: 'test-003-1-2',
          },
          {
            id: '003-1-3',
            name: '测试-003-1-3',
            value: 'test-003-1-3',
          }
        ]
      },
      {
        id: '003-2',
        name: '测试-003-2',
        value: 'test-003-2',
        children: [
          {
            id: '003-2-1',
            name: '测试-003-2-1',
            value: 'test-003-2-1',
          },
          {
            id: '003-2-2',
            name: '测试-003-2-2',
            value: 'test-003-2-2',
          },
          {
            id: '003-2-3',
            name: '测试-003-2-3',
            value: 'test-003-2-3',
          }
        ]
      },
      {
        id: '003-3',
        name: '测试-003-3',
        value: 'test-003-3',
        children: [
          {
            id: '003-3-1',
            name: '测试-003-3-1',
            value: 'test-003-3-1',
          },
          {
            id: '003-3-2',
            name: '测试-003-3-2',
            value: 'test-003-3-2',
          },
          {
            id: '003-3-3',
            name: '测试-003-3-3',
            value: 'test-003-3-3',
          }
        ]
      }
    ]
  }
]

export const tableHeader = [
  {
    title: '编号',
  },
  {
    title: '键',
  },
  {
    title: '值',
  }
]

export const viewKey = {
  0: 'id',
  1: 'name',
  2: 'value'
}