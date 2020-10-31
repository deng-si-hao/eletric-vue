import request from '@/utils/request'

// 查询图片存储列表
export function listPicture(query) {
  return request({
    url: '/system/picture/list',
    method: 'get',
    params: query
  })
}

// 查询图片存储详细
export function getPicture(id) {
  return request({
    url: '/system/picture/' + id,
    method: 'get'
  })
}

// 新增图片存储
export function addPicture(data) {
  return request({
    url: '/system/picture',
    method: 'post',
    data: data
  })
}

// 修改图片存储
export function updatePicture(data) {
  return request({
    url: '/system/picture',
    method: 'put',
    data: data
  })
}

// 删除图片存储
export function delPicture(id) {
  return request({
    url: '/system/picture/' + id,
    method: 'delete'
  })
}

// 导出图片存储
export function exportPicture(query) {
  return request({
    url: '/system/picture/export',
    method: 'get',
    params: query
  })
}
// 导出图片存储
export function issue(data) {
  return request({
    url: '/system/picture/issue',
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

// 预览图片列表
export function preview(data) {
  return request({
    url: '/system/picture/preview',
    method: 'post',
    data:data,
  })
}

// 下载文件
export function downloadFile(data) {
  return request({
    url: '/system/picture/downloadFile',
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
      // window.navigator.msSaveBlob(res, fileName)  // res为接口返回数据，这里请求的时候已经处理了，如果没处理需要在此之前自行处理var data = new Blob([res.data]) 注意这里需要是数组形式的,fileName就是下载之后的文件名
      window.navigator.msSaveOrOpenBlob(res, fileName);  //此方法类似上面的方法，区别可自行百度
    } catch (e) {
      console.log(e)
    }
  } else {
    let url = window.URL.createObjectURL(new Blob([res],{type:'application/zip'}))
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



