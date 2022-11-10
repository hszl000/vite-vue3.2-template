// 时间格式化文件
import dayjs from 'dayjs'

export default (value, format = 'YYYY-MM-DD') => {
  // dayjs转化成标准时间格式
  if (!isNaN(value)) {
    return dayjs(value).format(format)
  } else {
    return '时间不合法'
  }
}
