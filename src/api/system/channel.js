import request from '@/utils/request'

// 查询采集通道列表
export function listChannel(query) {
  return request({
    url: '/system/channel/list',
    method: 'get',
    params: query
  })
}

//获取采集通道列表
export function Chtreeselect() {
  return request({
    url:'/system/channel/treelist',
    method: 'get'
  })

}
// 查询采集通道详细
export function getChannel(channelId) {
  return request({
    url: '/system/channel/' + channelId,
    method: 'get'
  })
}

// 新增采集通道
export function addChannel(data) {
  return request({
    url: '/system/channel',
    method: 'post',
    data: data
  })
}

// 修改采集通道
export function updateChannel(data) {
  return request({
    url: '/system/channel',
    method: 'put',
    data: data
  })
}

// 删除采集通道
export function delChannel(channelId) {
  return request({
    url: '/system/channel/' + channelId,
    method: 'delete'
  })
}

// 导出采集通道
export function exportChannel(query) {
  return request({
    url: '/system/channel/export',
    method: 'get',
    params: query
  })
}

//获取采集通道数据
export function scannChannel(query) {
  return request({
    url: '/system/channel/scann/'+ query,
    method: 'get'
  })
}
