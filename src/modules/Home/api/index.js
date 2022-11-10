import request from 'utils/request'

export function getXXX (params) { // 测试
  return request({
    url: '/api/xxx',
    method: 'get',
    params
  })
}