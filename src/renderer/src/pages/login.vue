<script lang="ts" setup>
import { ResponseCode } from '../../../main/services/http'
import { ElLoading, ElMessage, FormInstance, FormRules } from 'element-plus'
import useAppStore from '../store/app'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AdminLoginPostResp } from '../../../main/services/auth'
import { ServicesEvents } from '../../../common/services-events'
const formRef = ref<FormInstance | null>(null)
const router = useRouter()
const appStore = useAppStore()
const form = ref({
  username: 'admin',
  password: '123456'
})
const formRules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ]
}
const onSubmit = (): void => {
  formRef.value!.validate(async (isValid) => {
    if (!isValid) {
      return false
    }
    const loading = ElLoading.service()
    try {
      const response = await window.electron.ipcRenderer.send(
        ServicesEvents.ADMIN_LOGIN,
        form.value
      )
      if (response.code === ResponseCode.SUCCESS) {
        ElMessage({
          type: 'success',
          message: '登录成功'
        })
        appStore.changeUserInfo(response.data as AdminLoginPostResp)
        router.replace({
          name: 'UPLOAD'
        })
      }
    } catch (error) {
      console.error('fetch login fail:', error)
    } finally {
      loading.close()
    }
    return true
  })
}
</script>
<template>
  <section mx-auto mt-100 w-300px>
    <h2 text-center pb-4 text-2xl text-blue>登录</h2>
    <el-form ref="formRef" :model="form" :rules="formRules" label-width="80">
      <el-form-item prop="username" label="用户名:">
        <el-input v-model="form.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item prop="password" label="密码" placeholder="请输入密码">
        <el-input v-model="form.password" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<style lang="scss" scoped></style>
