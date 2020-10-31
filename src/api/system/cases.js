import request from '@/utils/request'

// 查询算法案例列表
export function listCases(query) {
  return request({
    url: '/system/cases/list',
    method: 'get',
    params: query
  })
}

// 查询算法案例详细
export function getCases(id) {
  return request({
    url: '/system/cases/' + id,
    method: 'get'
  })
}

// 新增算法案例
export function addCases(data) {
  return request({
    url: '/system/cases',
    method: 'post',
    data: data
  })
}

// 修改算法案例
export function updateCases(data) {
  return request({
    url: '/system/cases',
    method: 'put',
    data: data
  })
}

// 删除算法案例
export function delCases(id) {
  return request({
    url: '/system/cases/' + id,
    method: 'delete'
  })
}

// 导出算法案例
export function exportCases(query) {
  return request({
    url: '/system/cases/export',
    method: 'get',
    params: query
  })
}