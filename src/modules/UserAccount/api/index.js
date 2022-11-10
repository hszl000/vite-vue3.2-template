import request from 'utils/request'

export function getUserInfo (params) {
  return request({
    url: '/api/demo_test/list',
    method: 'get',
    params
  })
}