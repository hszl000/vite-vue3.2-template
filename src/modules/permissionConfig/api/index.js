import request from 'utils/request'

// 岗位管理_分页列表
export function getPage (data) {
  return request({
    url: '/sysRole/page',
    method: 'post',
    data
  })
}

// 岗位管理_停用
export function disableSwitch (data) {
  return request({
    url: '/sysRole/disableSwitch',
    method: 'post',
    data
  })
}

// 人员派遣批量设置

// 列表
export function getList (data) {
  return request({
    url: '/personnelBatchSettingEntity/getList',
    method: 'post',
    data
  })
}

// 新增
export function add (data) {
  return request({
    url: '/personnelBatchSettingEntity/add',
    method: 'post',
    data
  })
}

// 修改
export function udpate (data) {
  return request({
    url: '/personnelBatchSettingEntity/udpate',
    method: 'post',
    data
  })
}

// 删除
export function del (data) {
  return request({
    url: '/personnelBatchSettingEntity/del',
    method: 'post',
    data
  })
}

// 部门_树
export function deptTree (data) {
  return request({
    url: '/sysDept/deptTree',
    method: 'post',
    data
  })
}
// 借调协调人维护

// 列表
export function getSecondmentList (data) {
  return request({
    url: '/secondmentCoordinatorEntity/getList',
    method: 'post',
    data
  })
}

// 分页列表
export function getSecondmentPageList (data) {
  return request({
    url: '/secondmentCoordinatorEntity/getPageList',
    method: 'post',
    data
  })
}

// 新增
export function secondmentAdd (data) {
  return request({
    url: '/secondmentCoordinatorEntity/add',
    method: 'post',
    data
  })
}

// 借调协调人维护-根据工号、名称模糊查询用户列表
export function getUserListByCodeOrName (data) {
  return request({
    url: '/sysUser/getUserListByCodeOrName',
    method: 'post',
    data
  })
}

// 修改
export function secondmentUpdate (data) {
  return request({
    url: '/secondmentCoordinatorEntity/update',
    method: 'post',
    data
  })
}

// 删除
export function secondmentDel (data) {
  return request({
    url: '/secondmentCoordinatorEntity/del',
    method: 'post',
    data
  })
}
