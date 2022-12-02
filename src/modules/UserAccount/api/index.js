import request from 'utils/request'

// 登录
export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户数据
export function getUserInfo (data) {
  return request({
    url: '/user/whoami',
    method: 'get',
    data,
    redirect:'/login'
  })
}

// 获取用户权限
export function getUserMenu (data) {
  return request({
    url: '/user/getUserMenu',
    method: 'post',
    data
  })
}