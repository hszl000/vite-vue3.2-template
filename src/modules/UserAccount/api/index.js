import request from 'utils/request'

// 获取用户数据
export function getUserInfo (data) {
  return request({
    url: '/acl/whoami',
    method: 'get',
    data,
    redirect:'/login'
  })
}

// 获取用户权限
export function getUserMenu (data) {
  return request({
    url: '/acl/getUserMenu',
    method: 'post',
    data
  })
}