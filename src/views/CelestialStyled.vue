<script setup lang="ts">
import { ref, computed } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, type Action } from 'element-plus'

const router = useRouter()

const nameStylePreview = computed(() => {
  if (synchronizeThe2Parts.value) {
    return 'X, ' + (removeWordThe.value ? '' : 'the ') + 'Celestial of X'
  }
  return 'A, ' + (removeWordThe.value ? '' : 'the ') + 'Celestial of B'
})

const ABParts = ref<{
  partA: string
  partB: string
}>({
  partA: '',
  partB: '',
})

const removeWordThe = ref<boolean>(false)

const synchronizeThe2Parts = ref<boolean>(false)

const nameResult = computed(() => {
  if (ABParts.value.partA !== '' && ABParts.value.partB !== '') {
    // If none of two parts are empty
    return (
      ABParts.value.partA +
      ', ' +
      (removeWordThe.value ? '' : 'the ') +
      'Celestial of ' +
      ABParts.value.partB
    )
  } else {
    return ''
  }
})

const handleSync2Parts = async (): Promise<boolean> => {
  // If the 2 parts are the same
  if (ABParts.value.partA === ABParts.value.partB) {
    return Promise.resolve(true)
  }

  return new Promise<boolean>((resolve, reject) => {
    ElMessageBox.confirm(
      `<p>请选择要保留的部分：</p><p>A 部分：${ABParts.value.partA}</p><p>B 部分: ${ABParts.value.partB}</p><p>（关闭弹窗以取消操作）</p>`,
      '选择要保留的部分',
      {
        distinguishCancelAndClose: true,
        cancelButtonText: '保留 A 部分',
        confirmButtonText: '保留 B 部分',
        cancelButtonType: 'default',
        confirmButtonType: 'default',
        dangerouslyUseHTMLString: true,
      },
    )
      .then(() => {
        handleKeepOnePart('B')
        resolve(true)
      })
      .catch((action: Action) => {
        if (action === 'cancel') {
          handleKeepOnePart('A')
          return resolve(true)
        } else if (action === 'close') {
          reject(false)
        }
      })
  })
}

const handleKeepOnePart = (part: 'A' | 'B') => {
  if (part === 'A') {
    ABParts.value.partB = ABParts.value.partA
  } else {
    ABParts.value.partA = ABParts.value.partB
  }
}

const handleCopyResult = async () => {
  try {
    await navigator.clipboard.writeText(nameResult.value)
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
  <PageLayout>
    <template #header>
      <el-button size="large" @click="router.replace('/')">回到主页</el-button>
      “..., the Celestial of ...” 式名字
    </template>
    <el-card>
      <div>
        <h2>样式预览</h2>
        <p>{{ nameStylePreview }}</p>
      </div>
      <el-divider />
      <div>
        <h2>名字选项</h2>
        <el-form label-position="top">
          <el-form-item label="控制两部分内容一致">
            <el-switch v-model="synchronizeThe2Parts" :before-change="handleSync2Parts" />
          </el-form-item>
          <template v-if="!synchronizeThe2Parts">
            <el-form-item label="A 部分内容">
              <el-input v-model="ABParts.partA" />
            </el-form-item>
            <el-form-item label="B 部分内容">
              <el-input v-model="ABParts.partB" />
            </el-form-item>
          </template>
          <template v-else-if="synchronizeThe2Parts">
            <el-form-item label="左右两部分（X 部分）内容">
              <el-input v-model="ABParts.partA" @input="ABParts.partB = ABParts.partA" />
            </el-form-item>
          </template>
          <el-form-item label="去掉冠词 the">
            <el-switch v-model="removeWordThe" />
          </el-form-item>
        </el-form>
      </div>
      <el-divider />
      <div>
        <h2>结果</h2>
        <el-button @click="handleCopyResult" :disabled="nameResult === ''">复制</el-button>
        <p>
          {{ nameResult }}
        </p>
      </div>
    </el-card>
  </PageLayout>
</template>
