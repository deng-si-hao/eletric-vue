import request from '@/utils/request'

// 查询文档存储列表
export function listReport(query) {
  return request({
    url: '/system/report/list',
    method: 'get',
    params: query
  })
}

// 查询文档存储详细
export function getReport(id) {
  return request({
    url: '/system/report/' + id,
    method: 'get'
  })
}

// 新增文档存储
export function addReport(data) {
  return request({
    url: '/system/report',
    method: 'post',
    data: data
  })
}

// 修改文档存储
export function updateReport(data) {
  return request({
    url: '/system/report',
    method: 'put',
    data: data
  })
}

// 删除文档存储
export function delReport(id) {
  return request({
    url: '/system/report/' + id,
    method: 'delete'
  })
}

// 导出文档存储
export function exportReport(query) {
  return request({
    url: '/system/report/export',
    method: 'get',
    params: query
  })
}

// 下发文档存储
export function issue(data) {
  return request({
    url: '/system/report/issue',
    method: 'post',
    data: data
  })
}

// 查询车辆信息列表
export function listAsset(query) {
  return request({
    url: '/system/asset/list',
    method: 'get',
    params: query
  })
}

// 查询文件列表
export function listDetail(data) {
  return request({
    url: '/system/report/detail',
    method: 'post',
    data: data
  })
}

// 删除文件（只删除hadoop）
export function delDetailFile(data) {
  return request({
    url: '/system/report/delDetailFile',
    method: 'post',
    data:data,
  })
}

// 下载文件
export function downloadFile(data) {
  return request({
    url: '/system/report/downloadFile',
    method: 'post',
    data:data,
    responseType:'blob'
  })
}

export function download_file(res, fileName) {
  if (!res) {
    return
  }
  if (window.navigator.msSaveBlob) {  // IE以及IE内核的浏览器
    try {
      window.navigator.msSaveBlob(res, fileName)  // res为接口返回数据，这里请求的时候已经处理了，如果没处理需要在此之前自行处理var data = new Blob([res.data]) 注意这里需要是数组形式的,fileName就是下载之后的文件名
      // window.navigator.msSaveOrOpenBlob(res, fileName);  //此方法类似上面的方法，区别可自行百度
    } catch (e) {
      console.log(e)
    }
  } else {
    let url = window.URL.createObjectURL(new Blob([res], {type: 'application/vnd.ms-excel'}))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)// 文件名
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) // 下载完成移除元素
    window.URL.revokeObjectURL(url) // 释放掉blob对象
  }
}
