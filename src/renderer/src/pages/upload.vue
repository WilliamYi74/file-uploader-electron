<script lang="ts" setup>
import useAppStore from '../store/app'
import FileList from '../components/file-list.vue'
const appStore = useAppStore()
</script>

<template>
  <header flex justify-end>
    <div p-4>
      <div flex items-center gap-2>
        <el-avatar :src="appStore.userInfo.avatar" fit="contain" /> 您好,
        {{ appStore.userInfo.username }}
      </div>
    </div>
  </header>
  <main>
    <file-list />
  </main>
</template>

<style lang="scss" scoped></style>
