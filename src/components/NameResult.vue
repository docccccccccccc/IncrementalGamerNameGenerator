<script setup lang="ts">
import { ElMessage } from 'element-plus'

const props = defineProps<{
  name: string
}>()

const handleCopyOneName = async () => {
  try {
    await navigator.clipboard.writeText(props.name)
    ElMessage({
      message: `已将名字复制到剪贴板！`,
      type: 'success',
    })
  } catch (e) {
    ElMessage({
      message: `复制失败：${(e as Error).message}`,
      type: 'error',
    })
  }
}
</script>

<template>
  <span @click="handleCopyOneName" class="name-result-item">
    <el-tooltip content="点我复制" placement="top" :enterable="false">
      {{ name }}
    </el-tooltip>
  </span>
</template>

<style lang="scss" scoped>
.name-result-item:hover {
  cursor: pointer;
  color: var(--el-color-primary);
  transition:
    color 0.2s,
    text-shadow 0.2s;
  text-shadow: var(--el-box-shadow-dark);
  // text-shadow: ;
}
</style>
