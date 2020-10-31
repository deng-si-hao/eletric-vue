import request from '@/utils/request'

// 查询连线列表
export function listEdges(query) {
  return request({
    url: '/system/edges/list',
    method: 'get',
    params: query
  })
}

// 查询连线详细
export function getEdges(id) {
  return request({
    url: '/system/edges/' + id,
    method: 'get'
  })
}

// 新增连线
export function addEdges(data) {
  return request({
    url: '/system/edges',
    method: 'post',
    data: data
  })
}

// 修改连线
export function updateEdges(data) {
  return request({
    url: '/system/edges',
    method: 'put',
    data: data
  })
}

// 删除连线
export function delEdges(id) {
  return request({
    url: '/system/edges/' + id,
    method: 'delete'
  })
}

// 导出连线
export function exportEdges(query) {
  return request({
    url: '/system/edges/export',
    method: 'get',
    params: query
  })
}