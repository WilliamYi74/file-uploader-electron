import { fetch } from './request'
import { ipcMain } from 'electron'
import { ADMIN_LOGIN } from './api'
import { HttpMethod } from './http'
import { IResponse } from '../types/axios'
import { ServicesEvents } from '../../common/services-events'
export type AdminLoginPostResp = {
  userId: string
  username: string
  avatar: string
}
type AdminLoginPostReq = {
  username: string
  password: string
}

export const register = () => {
  ipcMain.handle(ServicesEvents.ADMIN_LOGIN, async (event, data: AdminLoginPostReq) => {
    const response = await fetch<IResponse<AdminLoginPostResp>>({
      url: ADMIN_LOGIN,
      method: HttpMethod.POST,
      data
    })
    return response.data
  })
}
