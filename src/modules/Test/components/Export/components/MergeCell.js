export default class MergeCell {
  #map

  #size

  constructor(headers, data) {
    // 表头合并参数
    this.headerMerge = []
    // 表头数据
    this.headerValue = []
    // 表体数据
    this.bodyMapList = []
    this.#map = new Map()
    this.deep = 0
    this.init(headers, data)
  }

  /**
   * 数据初始化
   * @param {Array} headers 表头数据
   * @param {Array} data 表体数据
   */
  init(headers, data) {
    this.#size = this.getCellsSize(headers)
    this.deep = this.getDeep(headers)
    this.getBodyMapList(headers)
    this.mergeHeadersCell(headers)
    this.getHeadersValue(headers)
    this.bodyValue = data.map((item) =>
      this.bodyMapList.map((key) => item[key])
    )
  }

  /**
   * 获取表头最大深度
   * @param {Array} headers 表头数据
   * @returns 表头最大深度
   */
  getDeep(headers) {
    return this.#map.get(headers)[0]
  }

  /**
   * 根据节点获取深度广度
   * @param {Array} list 表头数据
   * @returns
   */
  getCellsSize(list) {
    if (this.#map.has(list)) {
      return this.#map.get(list)
    }
    if (list?.length) {
      let rows = -1
      let cols = list.length - 1
      list.forEach((item) => {
        if (item.children?.length) {
          const size = this.getCellsSize(item.children)
          rows = Math.max(size[0], rows)
          cols += size[1]
        }
      })
      this.#map.set(list, [rows + 1, cols])
      return [rows + 1, cols]
    }
  }

  /**
   * 合并表头
   * @param {Array} headers 表头数据
   * @param {*} row 行数
   * @param {*} col 列数
   *
   * 在xlsx中，r代表行，c代表列。
   * 在xlsx中，s和e代表筛选条件，用于设置数据筛选。s表示开始，e表示结束。例如，如果希望从第2行开始筛选到第10行，可以使用"s2:e10"。
   */
  mergeHeadersCell = (headers, row = 0, col = 0) => {
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i]
      if (!cell.children?.length) {
        // if (row !== this.#size[0]) {
        const obj = {
          s: { r: row, c: col + i },
          e: { r: this.#size[0], c: col + i }
        }
        this.headerMerge.push(obj)
        // }
      } else {
        const size = this.#map.get(cell.children)
        const obj = {
          s: { r: row, c: col + i },
          e: { r: row, c: col + size[1] + i }
        }
        this.headerMerge.push(obj)
        this.mergeHeadersCell(cell.children, row + 1, col + i)
        col += size[1]
      }
    }
  }

  /** 表头赋值 */
  getHeadersValue(headers, row = 0, col = 0) {
    if (!this.headerValue[row]) {
      console.log(row,this.deep,'row')
      this.headerValue[row] = new Array(col).fill('')
      console.log(JSON.stringify(this.headerValue),'this.headerValue')
    }
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i]
      this.headerValue[row].push(cell.label)
      if (cell.children?.length) {
        const len = this.getCellsSize(cell.children)[1]
        const emptyNameList = new Array(len).fill('')
        this.headerValue[row].push(...emptyNameList)
        this.getHeadersValue(cell.children, row + 1, col + i)
      }else{
        if(![0,this.deep].includes(row) && !cell.children?.length){
          const emptyNameList = new Array(1).fill('')
          this.headerValue[row+1].push(...emptyNameList)
        }
      }

      console.log(row,JSON.parse(JSON.stringify(this.headerValue)))
    }
  }

  /**
   * 正文prop对应
   * @param {Array} list 表头数据
   */
  getBodyMapList(list) {
    if (list?.length) {
      list.forEach((item) => {
        if (!item.children?.length) {
          this.bodyMapList.push(item.prop)
        } else {
          this.getBodyMapList(item.children)
        }
      })
    }
  }
}