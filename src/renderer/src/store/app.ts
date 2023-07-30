import { AdminLoginPostResp } from '@renderer/services/auth'
import { defineStore } from 'pinia'
const STORE_ID_APP = 'store_id_app'
const useAppStore = defineStore(STORE_ID_APP, {
  state() {
    return {
      userInfo: {
        userId: '',
        username: '',
        avatar: ''
      } as AdminLoginPostResp
    }
  },
  actions: {
    changeUserInfo(payload: AdminLoginPostResp) {
      this.userInfo = {
        ...this.userInfo,
        ...payload
      }
    }
  },
  persist: {
    key: STORE_ID_APP,
    storage: window.localStorage,
    paths: undefined
  }
})
export default useAppStore
