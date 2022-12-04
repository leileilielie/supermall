import axios from 'axios'

export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 2. axios拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  })

  // 3. 响应拦截
  instance.interceptors.response.use(res =>{
    return res.data
  },err => {
    console.log(err)
  })

  // 4. 发送真正的网络请求 返回的是promise 可以直接使用then
  return instance(config)
}
