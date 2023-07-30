<script lang="ts" setup>
import { ref } from 'vue'
import { ServicesEvents } from '../../../common/services-events'
import { ElMessage, type UploadFile, type UploadProps, type UploadUserFile } from 'element-plus'
import { useVModelProp } from '../hooks/utils'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
type UploadFileItem = {
  id: string
  fileName: string
  url: string
}
const fileList = ref<UploadUserFile[]>([])
const totalFiles = ref<UploadFileItem[]>([])
const onBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(rawFile.type)) {
    ElMessage.error('只能上传图片')
    return false
  }
  return true
}
const onUpload = async (uploadFile: UploadFile) => {
  const response = await window.electron.ipcRenderer.send(ServicesEvents.FILE_ADMIN_UPLOAD, {
    files: [uploadFile.raw!]
  })
  totalFiles.value?.push({
    id: String(uploadFile.uid),
    fileName: uploadFile.name,
    url: response.data![0]
  })
}
// @ts-expect-error emit function params type is any, cannot fix
const visible = useVModelProp(props, 'modelValue', emit)
</script>

<template>
  <el-dialog v-model="visible" title="上传文件" fullscreen>
    <el-upload
      v-model:file-list="fileList"
      action=""
      :before-upload="onBeforeUpload"
      multiple
      drag
      :on-change="onUpload"
      :auto-upload="false"
      :show-file-list="false"
    >
      <el-button type="primary">点击/拖拽上传</el-button>
      <template #tip>
        <div class="el-upload__tip">点击/拖转到指定区域进行上传</div>
      </template>
    </el-upload>
    <el-table v-if="totalFiles.length > 0" :data="totalFiles" height="600">
      <el-table-column prop="fileName" label="文件名称"></el-table-column>
      <el-table-column label="预览">
        <template #default="props">
          <el-image style="width: 100px; max-height: 300px" :src="props.row.url" fit="contain" />
        </template>
      </el-table-column>
      <el-table-column prop="url" label="文件地址"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-upload-dragger) {
  --el-upload-dragger-padding-horizontal: 100px;
}
</style>
