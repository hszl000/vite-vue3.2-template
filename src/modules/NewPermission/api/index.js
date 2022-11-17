import request from 'utils/request'

// 权限管理_树
export function getTree (data) {
  return request({
    url: '/sysMenu/tree',
    method: 'post',
    data
  })
}

// 用户_分页列表
export function getAddUserPage (data) {
  return request({
    url: '/sysUser/page',
    method: 'post',
    data
  })
}

// 用户职级字典
export function getUserLevelDict (data) {
  return request({
    url: '/sysUser/userLevelDict',
    method: 'post',
    data
  })
}

// 根据职级查询用户列表
export function getUserListByLevel (data) {
  return request({
    url: '/sysUser/getUserListByLevel',
    method: 'post',
    data
  })
}

// 部门角色字典
export function getDeptRolesDict (data) {
  return request({
    url: '/sysUser/deptRolesDict',
    method: 'post',
    data
  })
}

// 根据角色查询用户列表
export function getUserListByRole (data) {
  return request({
    url: '/sysUser/getUserListByRole',
    method: 'post',
    data
  })
}

// 岗位管理_新增_提交
export function add (data) {
  return request({
    url: '/sysRole/add',
    method: 'post',
    data
  })
}

// 岗位管理_详情
export function detail (data) {
  return request({
    url: '/sysRole/detail',
    method: 'post',
    data
  })
}

// 岗位管理_根据id修改
export function updateById (data) {
  return request({
    url: '/sysRole/updateById',
    method: 'post',
    data
  })
}

// 人员字典列表
export function getUserDictList (data) {
  return request({
    url: '/sysUser/getUserDictList',
    method: 'post',
    data
  })
}

// 分页人员字典列表
export function getPageUserDictList (data) {
  return request({
    url: '/sysUser/getPageUserDictList',
    method: 'post',
    data
  })
}
