import request from '@/utils/request'

// 查询节点侧栏列表
export function listBar(query) {
  return request({
    url: '/system/bar/list',
    method: 'get',
    params: query
  })
}

// 查询节点侧栏详细
export function getBar(id) {
  return request({
    url: '/system/bar/' + id,
    method: 'get'
  })
}

// 新增节点侧栏
export function addBar(data) {
  return request({
    url: '/system/bar',
    method: 'post',
    data: data
  })
}

// 修改节点侧栏
export function updateBar(data) {
  return request({
    url: '/system/bar',
    method: 'put',
    data: data
  })
}

// 删除节点侧栏
export function delBar(id) {
  return request({
    url: '/system/bar/' + id,
    method: 'delete'
  })
}

// 导出节点侧栏
export function exportBar(query) {
  return request({
    url: '/system/bar/export',
    method: 'get',
    params: query
  })
}