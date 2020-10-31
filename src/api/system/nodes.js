import request from '@/utils/request'

// 查询节点数据列表
export function listNodes(query) {
  return request({
    url: '/system/nodes/list',
    method: 'get',
    params: query
  })
}

// 查询节点数据详细
export function getNodes(id) {
  return request({
    url: '/system/nodes/' + id,
    method: 'get'
  })
}

// 新增节点数据
export function addNodes(data) {
  return request({
    url: '/system/nodes',
    method: 'post',
    data: data
  })
}

// 修改节点数据
export function updateNodes(data) {
  return request({
    url: '/system/nodes',
    method: 'put',
    data: data
  })
}

// 删除节点数据
export function delNodes(id) {
  return request({
    url: '/system/nodes/' + id,
    method: 'delete'
  })
}

// 导出节点数据
export function exportNodes(query) {
  return request({
    url: '/system/nodes/export',
    method: 'get',
    params: query
  })
}