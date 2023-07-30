<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ResponseCode } from '../../../main/services/http'
import { pickBy } from 'lodash-es'
import { ElLoading } from 'element-plus'
import { ServicesEvents } from '../../../common/services-events'
import { FileListGetResp, FileListGetReq } from '../../../main/services/upload'
const list = ref<FileListGetResp>([])
const showUploadDialog = ref(false)
const params = ref<FileListGetReq>({
  type: '',
  originalName: ''
})
const typeOptions = [
  {
    id: 1,
    label: '',
    text: '全部'
  },
  {
    id: 2,
    label: 'INFORMATION_LIBRARY',
    text: '资料库'
  },
  {
    id: 3,
    label: 'BOOK_LIBRARY',
    text: '书库'
  },
  {
    id: 4,
    label: 'SYSTEM_FILE',
    text: '系统文件'
  },
  {
    id: 5,
    label: 'OTHER',
    text: '其他文件'
  }
]
const fetchFileList = async () => {
  const loading = ElLoading.service()
  try {
    const response = window.electron.ipcRenderer.send(
      ServicesEvents.FILE_LIST,
      pickBy(params.value)
    )
    if (response.code === ResponseCode.SUCCESS) {
      list.value = response.data as FileListGetResp
    }
  } catch (error) {
    console.error('fetch file list fail:', error)
  } finally {
    loading.close()
  }
}
const onOpenUploadDialog = () => {
  showUploadDialog.value = true
}
onMounted(() => {
  fetchFileList()
})
</script>

<template>
  <section p-4 flex justify-end gap-2 px-4>
    <div>
      <el-radio-group v-model="params.type" @change="fetchFileList">
        <el-radio-button v-for="item in typeOptions" :key="item.id" :label="item.label">{{
          item.text
        }}</el-radio-button>
      </el-radio-group>
    </div>
    <div flex gap-2>
      <el-input v-model="params.originalName" placeholder="请输入文件名" />
      <el-button type="primary" clearable @click="fetchFileList">搜索</el-button>
    </div>
    <div>
      <el-button type="success" @click="onOpenUploadDialog">上传</el-button>
    </div>
  </section>
  <section px-4>
    <el-table :data="list" height="800">
      <el-table-column label="文件名" prop="fileName"></el-table-column>
      <el-table-column label="文件地址" prop="url"></el-table-column>
      <el-table-column label="预览">
        <template #default="props">
          <el-image :src="props.row.url" fit="contain" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>
  </section>
  <upload-dialog v-model="showUploadDialog" />
</template>

<style lang="scss" scoped></style>
