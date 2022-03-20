import axios from 'axios'
// import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token失效'))
      }
    }
    config.headers.Authorsization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

// 统一拦截请求 可设置请求快速显示正确或者提示

// service.interceptors.response.use(
//   (response) => {
//     const { data, status } = response.data
//     if (status === 200 || status === 201) {
//       return data
//     } else {
//       ElMessage.error(status.data)
//       return Promise.reject(new Error(status.msg))
//     }
//   },
//   (error) => {
//     error.response && ElMessage.error(error.response.data)
//     return Promise.reject(new Error(error.response.data))
//   }
// )

export default service
