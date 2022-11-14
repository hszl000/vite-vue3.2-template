// 表格切换页码滚动条返回最顶端
const setScrollTop = () => {
  const overflowY = document.getElementsByClassName('el-table__body-wrapper')[0]
  if (!overflowY) { return }
  overflowY.scrollTop = 0
}
export { setScrollTop }
