<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import NameResult from '@/components/NameResult.vue'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
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
  bulkValue: number
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
  bulkValue: 0,
})

const nameOptionsFormRef = ref<FormInstance>()

/* eslint-disable @typescript-eslint/no-explicit-any */
const checkCustomizedText = (rule: any, value: string, callback: any) => {
  // If value is empty
  if (!value) {
    callback(new Error('此处不能为空'))
  } else {
    if (!(value.length === 3)) {
      callback(new Error('输入的内容必须为 3 个字符'))
    }

    callback()
  }
}

const checkCustomizedNum = (rule: any, value: string, callback: any) => {
  function isNumberChar(char: string) {
    const charCode = char.charCodeAt(0)
    return charCode >= 48 && charCode <= 57
  }

  if (!value.split('').every((char: string) => isNumberChar(char))) {
    callback(new Error('输入的内容不是数字（或者你输入了其他的数字字符）'))
  } else if (!(value.length === 3) && !(value.length === 0)) {
    callback(new Error('输入的内容必须为 3 个字符，或者留空'))
  } else {
    callback()
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

const nameResult = ref<string[]>([])

const nameIsGenerated = ref<boolean>(false)

const triggerGeneration = () => {
  nameResult.value = []
  function generateBeforeE(): string {
    let result: string = ''
    for (let i = 0; i < 3; i++) {
      // wtf
      // Get cases for every characters
      const uppercase = nameOptionsFormValue.beforeE.uppercase
      // Then convert to boolean
      const useUppercase: boolean[] = [
        uppercase.includes('A'),
        uppercase.includes('B'),
        uppercase.includes('C'),
      ]
      result += useUppercase[i]
        ? String.fromCharCode(Math.floor(65 + Math.random() * 26))
        : String.fromCharCode(Math.floor(97 + Math.random() * 26))
    }
    return result
  }

  function generateAfterE(): string {
    let result: string = ''
    for (let i = 0; i < 3; i++) {
      result += String.fromCharCode(Math.floor(48 + Math.random() * 10))
    }
    return result
  }

  const nameAmount = (() => (generationIsRandom.value ? nameOptionsFormValue.bulkValue : 1))()

  for (let i = 0; i < Math.min(nameAmount, 10000); i++) {
    const beforeE = nameOptionsFormValue.beforeE.limited
      ? generateBeforeE()
      : nameOptionsFormValue.beforeE.customizedText

    const afterE = nameOptionsFormValue.afterE.limited
      ? '308'
      : nameOptionsFormValue.afterE.customizedNum === ''
        ? generateAfterE() // Random generate if empty
        : nameOptionsFormValue.afterE.customizedNum

    nameResult.value.push(beforeE + 'e' + afterE)
  }

  currentResultPageNum.value = 1

  nameIsGenerated.value = true
}

const generationIsRandom = computed(() => {
  const beforeEIsLimited = nameOptionsFormValue.beforeE.limited
  const afterEIsLimited = nameOptionsFormValue.afterE.limited
  return (
    beforeEIsLimited ||
    nameOptionsFormValue.afterE.customizedNum === '' ||
    (beforeEIsLimited && !afterEIsLimited)
  )
})

const handleGenerateButtonClick = async (nameOptionsFormEl: FormInstance | undefined) => {
  if (!nameOptionsFormEl) return
  try {
    await nameOptionsFormEl.validate()
    triggerGeneration()
  } catch (e) {
    console.error(e)
    ElMessage({
      message: '请检查选项内容后重试',
      type: 'error',
    })
  }
}

const handleCopyNames = async () => {
  try {
    await navigator.clipboard.writeText(nameResult.value.join(' '))
    ElMessage({
      message: `已将 ${nameResult.value.length} 个名字全部复制到剪贴板！`,
      type: 'success',
    })
  } catch (e) {
    ElMessage({
      message: `复制失败：${(e as Error).message}`,
      type: 'error',
    })
  }
}

const currentResultPageNum = ref(1)

const slicedResult = computed(() => {
  const firstOneIndex = (currentResultPageNum.value - 1) * 100
  const lastOneIndex = firstOneIndex + 100
  return nameResult.value.slice(firstOneIndex, lastOneIndex)
})
</script>

<template>
  <PageLayout>
    <template #header>
      <el-button size="large" @click="router.replace('/')">回到主页</el-button>
      "...e308" 式名字
    </template>
    <el-card>
      <h2>样式预览</h2>
      <p class="name-style-preview">{{ nameStylePreview }}</p>
      <el-divider />
      <h2>名字选项</h2>
      <p><i>PS：这里“限制”某一部分意味着这一部分名字不能自己取.</i></p>
      <el-form
        :model="nameOptionsFormValue"
        ref="nameOptionsFormRef"
        :rules="nameOptionsFormRules"
        label-position="top"
      >
        <!-- Limit first -->
        <el-form-item label="取名限制">
          <el-checkbox v-model="nameOptionsFormValue.beforeE.limited" label="限制 e 前部分" />
          <el-checkbox v-model="nameOptionsFormValue.afterE.limited" label="限制 e 后部分" />
        </el-form-item>
        <!-- Then, handle 2 parts -->
        <!-- BeforeE first -->

        <!-- Unlimited -->
        <el-form-item
          label="e 前部分（3 个字符）"
          prop="beforeE.customizedText"
          v-if="!nameOptionsFormValue.beforeE.limited"
        >
          <el-input v-model="nameOptionsFormValue.beforeE.customizedText" />
        </el-form-item>

        <!-- Limited -->
        <el-form-item
          label="e 前部分字母大小写选项（单击某一位置以在该位置启用大写）"
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
          label="e 后部分（仅允许 000 - 999）内的 3 位数字（留空以随机生成）"
          prop="afterE.customizedNum"
          v-if="!nameOptionsFormValue.afterE.limited"
        >
          <el-input v-model="nameOptionsFormValue.afterE.customizedNum" placeholder="随机生成" />
        </el-form-item>

        <!-- Bulk -->
        <el-form-item label="批量生成数量（名字某一部分可随机生成时启用）">
          <el-input-number
            v-model="nameOptionsFormValue.bulkValue"
            :min="1"
            :max="10000"
            :disabled="!generationIsRandom"
          />
        </el-form-item>
      </el-form>
      <el-button @click="handleGenerateButtonClick(nameOptionsFormRef)" type="primary"
        >生成</el-button
      >
      <el-divider />
      <h2>结果{{ nameIsGenerated ? `（共 ${nameResult.length} 个）` : '' }}</h2>
      <div>
        <p><i>点击其中一个名字以复制.</i></p>
        <el-button :disabled="!nameIsGenerated" @click="handleCopyNames">复制全部</el-button>
        <div>
          <el-space
            wrap
            :style="{
              justifyContent: 'center',
            }"
          >
            <NameResult v-for="name in slicedResult" :key="name" :name="name" />
          </el-space>
          <el-pagination
            hide-on-single-page
            layout="prev, pager, next"
            :total="nameResult.length"
            :page-size="100"
            v-model:current-page="currentResultPageNum"
            style="justify-content: center"
          />
        </div>
      </div>
    </el-card>
  </PageLayout>
</template>
