export declare module 'axios' {
  interface AxiosRequestConfig {
    notNeedSetAccessToken?: boolean
    isAuth?: boolean
  }
}
export interface IPageReq {
  size?: number
  current?: number
}
export interface IPageResp {
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string
}
export interface IResponse<T = boolean> {
  code: 0 | 1
  data: T | null | boolean | string | []
  msg: null | string
}
export interface LimitPage<T> {
  total: number
  records: T[]
}
