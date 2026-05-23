<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { type FormInstance } from 'element-plus'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface nameOptionsForm {
  beforeE: {
    limited: boolean
    customizedText: string
    uppercase: string[]
  }
  afterE: {
    limited: boolean
    customizedNum: number
  }
}

const nameOptionsFormValue = reactive<nameOptionsForm>({
  beforeE: {
    limited: true,
    customizedText: 'AbC',
    uppercase: ['A', 'C'],
  },
  afterE: {
    limited: true,
    customizedNum: 308,
  },
})

const nameOptionsFormRef = ref<FormInstance>()

const nameStylePreview = computed(() => {
  // Return 'Any' if both are unlimited
  if (!(nameOptionsFormValue.beforeE.limited || nameOptionsFormValue.afterE.limited)) {
    return '[任意]'
  }

  const uppercase = nameOptionsFormValue.beforeE.uppercase

  // BeforeE part in return value
  const beforeE = nameOptionsFormValue.beforeE.limited
    ? (uppercase.includes('A') ? 'A' : 'a') +
      (uppercase.includes('B') ? 'B' : 'b') +
      (uppercase.includes('C') ? 'C' : 'c')
    : '[任意三个字母]'
  // AfterE part in return value
  const afterE = nameOptionsFormValue.afterE.limited ? '308' : '[任意三位数字]'

  return beforeE + 'e' + afterE
})
</script>

<template>
  <PageLayout>
    <template #header>
      <el-button size="large" @click="router.replace('/')">回到主页</el-button>
      "...e308" 式名字
    </template>
    <el-card>
      <h2>名字选项</h2>
      <h3>样式预览</h3>
      <p class="name-style-preview">{{ nameStylePreview }}</p>
      <el-divider />
      <el-form :model="nameOptionsFormValue" :ref="nameOptionsFormRef">
        <!-- Limit first -->
        <el-form-item label="取名限制">
          <el-form-item label="限制 e 前部分" prop="beforeE.limited">
            <el-switch v-model="nameOptionsFormValue.beforeE.limited" />
          </el-form-item>
          <el-form-item label="限制 e 后部分" prop="afterE.limited">
            <el-switch v-model="nameOptionsFormValue.afterE.limited" />
          </el-form-item>
        </el-form-item>
        <!-- Then, handle 2 parts -->
        <!-- BeforeE first -->

        <!-- Unlimited -->
        <el-form-item
          label="e 前部分（仅允许字母）"
          prop="beforeE.customizedText"
          v-if="!nameOptionsFormValue.beforeE.limited"
        >
          <el-input v-model="nameOptionsFormValue.beforeE.customizedText" />
        </el-form-item>

        <!-- Limited -->
        <el-form-item
          label="e 前部分字母大小写选项"
          prop="beforeE.uppercase"
          v-if="nameOptionsFormValue.beforeE.limited"
        >
          <el-checkbox-group v-model="nameOptionsFormValue.beforeE.uppercase">
            <el-checkbox-button
              :value="checkboxBtn"
              v-for="checkboxBtn in 'ABC'"
              :key="checkboxBtn"
            >
              {{
                nameOptionsFormValue.beforeE.uppercase.includes(checkboxBtn)
                  ? checkboxBtn
                  : checkboxBtn.toLowerCase()
              }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <!-- Then AfterE -->
        <!-- Unlimited only -->
        <el-form-item
          label="e 后部分（仅允许 000 - 999）内的数字"
          prop="afterE.customizedNum"
          v-if="!nameOptionsFormValue.afterE.limited"
        >
          <el-input v-model="nameOptionsFormValue.afterE.customizedNum" />
        </el-form-item>
      </el-form>
    </el-card>
  </PageLayout>
</template>
