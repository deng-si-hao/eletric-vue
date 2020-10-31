import request from '@/utils/request'

// 查询节点算法对应列表
export function listMap(query) {
  return request({
    url: '/system/map/list',
    method: 'get',
    params: query
  })
}

// 查询节点算法对应详细
export function getMap(id) {
  return request({
    url: '/system/map/' + id,
    method: 'get'
  })
}

// 新增节点算法对应
export function addMap(data) {
  return request({
    url: '/system/map',
    method: 'post',
    data: data
  })
}

// 修改节点算法对应
export function updateMap(data) {
  return request({
    url: '/system/map',
    method: 'put',
    data: data
  })
}

// 删除节点算法对应
export function delMap(id) {
  return request({
    url: '/system/map/' + id,
    method: 'delete'
  })
}

// 导出节点算法对应
export function exportMap(query) {
  return request({
    url: '/system/map/export',
    method: 'get',
    params: query
  })
}