import axios from 'axios'

export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // 2. axios拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // some errors handle here.
    console.log(err)
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    // some errors handle here.
    console.log(err)
  })

  // 3. 返回axios实例请求后返回的Promise对象
  return instance(config)
}
