import { ipcMain } from 'electron'
import { IResponse } from '../types/axios'
import { fetch } from './request'
import { FILE_ADMIN_UPLOAD, FILE_LIST } from './api'
import { HttpMethod } from './http'
import { ServicesEvents } from '../../common/services-events'
export type FileType = 'OTHER' | 'INFORMATION_LIBRARY' | 'BOOK_LIBRARY' | 'SYSTEM_FILE' | ''
export type FileListGetReq = {
  type?: FileType
  originalName?: string
}
export type FileListGetResp = {
  id: string
  fileName: string
  url: string
  createTime: string
}[]
export type FileAdminUploadPostReq = {
  files: File[]
}
export type FileAdminUploadPostResp = string[]

export const register = () => {
  ipcMain.handle(ServicesEvents.FILE_LIST, async (event, params: FileListGetResp) => {
    const response = await fetch<IResponse<FileListGetResp>>({
      url: FILE_LIST,
      params
    })
    return response.data
  })

  ipcMain.handle(ServicesEvents.FILE_ADMIN_UPLOAD, async (event, data: FileAdminUploadPostReq) => {
    const formData = new FormData()
    for (const item of data.files) {
      formData.append('files', item)
    }
    const response = await fetch<IResponse<FileAdminUploadPostResp>>({
      url: FILE_ADMIN_UPLOAD,
      method: HttpMethod.POST,
      data: formData
    })
    return response.data
  })
}
