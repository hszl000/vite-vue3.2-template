import request from 'utils/request'

// 获取用户消息
export function getMsgList (data) {
  return request({
    url: '/message/getMsgList',
    method: 'post',
    data
  })
}

// 待办列表
export function getTodoList (data) {
  return request({
    url: '/flow/getTodoList',
    method: 'post',
    data
  })
}

// 一键已读
export function delUserAllMsg (data) {
  return request({
    url: '/message/delUserAllMsg',
    method: 'post',
    data
  })
}