import axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL, HttpMethod, HttpStatus, ResponseCode } from './http'
import router from '../../renderer/src/router'
import { ElMessage } from 'element-plus'
const instance = axios.create({
  baseURL: BASE_URL,
  method: HttpMethod.GET,
  timeout: 15000,
  withCredentials: true,
  timeoutErrorMessage: '请求超时, 请稍后再试'
})
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response) => {
    if (response.status === HttpStatus.OK) {
      if (response.data.code === ResponseCode.SUCCESS) {
        return response.data
      }
      if (response.data.code === ResponseCode.UNAUTHORIZED) {
        ElMessage({
          type: 'error',
          message: response.data.msg
        })
        return router.replace({
          name: 'LOGIN'
        })
      }
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export const fetch = <R>(config: AxiosRequestConfig): Promise<R> =>
  new Promise((resolve, reject) => {
    instance<R>(config)
      .then((result) => {
        resolve(result as R)
      })
      .catch((error) => {
        reject(error)
      })
  })
