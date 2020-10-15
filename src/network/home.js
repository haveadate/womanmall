import {
  request
} from 'network/request'

// 请求页面开头部分信息
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 请求流行/新款/精选商品信息
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
