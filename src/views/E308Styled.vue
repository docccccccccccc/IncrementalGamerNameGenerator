<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { type FormRules, type FormInstance } from 'element-plus'
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
    customizedNum: string // For leading 0 =)
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
    customizedNum: '308',
  },
})

const nameOptionsFormRef = ref<FormInstance>()

/* eslint-disable @typescript-eslint/no-explicit-any */
const checkCustomizedText = (rule: any, value: string, callback: any) => {
  // If value is empty
  if (!value) {
    callback(new Error('此处不能为空'))
  }

  function isEnglishLetter(char: string) {
    // I can't memorize ASCII well so far
    const charCode = char.charCodeAt(0)
    const isUppercase = charCode >= 65 && charCode <= 90
    const isLowercase = charCode >= 97 && charCode <= 122
    return isUppercase || isLowercase
  }

  // English letter
  if (!value.split('').every((char: string) => isEnglishLetter(char))) {
    callback(new Error('输入的内容不是英文字母'))
  }

  if (!(value.length === 3)) {
    callback(new Error('输入的内容必须为 3 个字符'))
  }
}

const checkCustomizedNum = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('此处不能为空'))
  }

  function isNumberChar(char: string) {
    const charCode = char.charCodeAt(0)
    return charCode >= 48 && charCode <= 57
  }

  if (!value.split('').every((char: string) => isNumberChar(char))) {
    callback(new Error('输入的内容不是数字（或者你输入了其他的数字字符）'))
  }

  if (!(value.length === 3)) {
    callback(new Error('输入的内容必须为 3 个字符'))
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */
const nameOptionsFormRules = reactive<FormRules<nameOptionsForm>>({
  'beforeE.customizedText': [{ validator: checkCustomizedText, trigger: 'blur' }],
  'afterE.customizedNum': [{ validator: checkCustomizedNum, trigger: 'blur' }],
})

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
      <el-form
        :model="nameOptionsFormValue"
        :ref="nameOptionsFormRef"
        :rules="nameOptionsFormRules"
      >
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
          label="e 后部分（仅允许 000 - 999）内的 3 位数字"
          prop="afterE.customizedNum"
          v-if="!nameOptionsFormValue.afterE.limited"
        >
          <el-input v-model="nameOptionsFormValue.afterE.customizedNum" />
        </el-form-item>
      </el-form>
    </el-card>
  </PageLayout>
</template>
