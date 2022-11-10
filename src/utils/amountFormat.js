// 转化千分位
const MoneyTest = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/

// 金额添加千分位
const comdify = function (n) {
  if (!n) return n
  const str = n.split('.')
  const re = /\d{1,3}(?=(\d{3})+$)/g
  const n1 = str[0].replace(re, '$&,')
  return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}.00`
}
// 去除千分位中的‘，’
const delcommafy = function (num) {
  if (!num) return num
  num = num.toString()
  num = num.replace(/,/gi, '')
  return num
}
const valdateFn = function (rule, val, cb) {
  setTimeout(() => {
    if (val) {
      const inputVal = delcommafy(val)
      if (rule.test(inputVal)) {
        cb()
      } else {
        // cb('只能是数字金额,最多两位小数')
      }
    }
    cb()
  })
}
// 验证金额数字可以为负数
const moneyValid = function (rule, val, cb) {
  valdateFn(/((^-?[1-9]\d*)|^-?0)(\.\d{0,2}){0,1}$/, val, cb)
}
// 验证金额数字不可以为负数
const moneyNValid = function (rule, val, cb) {
  valdateFn(MoneyTest, val, cb)
}

// 获取输入框的值
// const getInputValue = function (el) {
//     let inputVal = el.target.value || '';
//     return comdify(delcommafy(inputVal));
// };

// 获取输入框的值
export const getInputValue = (el) => {
  const inputVal = el || ''
  if (el === 0 || el === '0') {
    return 0
  }
  return comdify(delcommafy(inputVal))
}

// 千分位反格式化:10,000.00转为10000.00
export const rmoney = (num) => {
  if (!num) return num
  num = num.toString()
  num = num.replace(/,/gi, '')
  return num
}
