<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import NameResult from '@/components/NameResult.vue'
import { type FormRules, type FormInstance, ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface nameOptionsForm {
  leftPart: {
    limited: boolean
    customizedText: string
    uppercase: string[]
  }
  rightPart: {
    limited: boolean
    customizedNum: string // For leading 0 =)
  }
  bulkValue: number
}

const nameOptionsFormValue = reactive<nameOptionsForm>({
  leftPart: {
    limited: true,
    customizedText: 'AbC',
    uppercase: ['A', 'C'],
  },
  rightPart: {
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
  'leftPart.customizedText': [{ validator: checkCustomizedText, trigger: 'blur' }],
  'rightPart.customizedNum': [{ validator: checkCustomizedNum, trigger: 'blur' }],
})

const nameStylePreview = computed(() => {
  // Return 'Any' if both are unlimited
  if (!(nameOptionsFormValue.leftPart.limited || nameOptionsFormValue.rightPart.limited)) {
    return '[任意]'
  }

  const uppercase = nameOptionsFormValue.leftPart.uppercase

  // leftPart part in return value
  const leftPart = nameOptionsFormValue.leftPart.limited
    ? (uppercase.includes('A') ? 'A' : 'a') +
      (uppercase.includes('B') ? 'B' : 'b') +
      (uppercase.includes('C') ? 'C' : 'c')
    : '[任意三个字母]'
  // rightPart part in return value
  const rightPart = nameOptionsFormValue.rightPart.limited ? '308' : '[任意三位数字]'

  return leftPart + 'e' + rightPart
})

const nameResult = ref<string[]>([])

const nameIsGenerated = ref<boolean>(false)

const triggerGeneration = () => {
  nameResult.value = []
  function generateleftPart(): string {
    let result: string = ''
    for (let i = 0; i < 3; i++) {
      // wtf
      // Get cases for every characters
      const uppercase = nameOptionsFormValue.leftPart.uppercase
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

  function generaterightPart(): string {
    let result: string = ''
    for (let i = 0; i < 3; i++) {
      result += String.fromCharCode(Math.floor(48 + Math.random() * 10))
    }
    return result
  }

  const nameAmount = (() => (generationIsRandom.value ? nameOptionsFormValue.bulkValue : 1))()

  for (let i = 0; i < Math.min(nameAmount, 10000); i++) {
    const leftPart = nameOptionsFormValue.leftPart.limited
      ? generateleftPart()
      : nameOptionsFormValue.leftPart.customizedText

    const rightPart = nameOptionsFormValue.rightPart.limited
      ? '308'
      : nameOptionsFormValue.rightPart.customizedNum === ''
        ? generaterightPart() // Random generate if empty
        : nameOptionsFormValue.rightPart.customizedNum

    if (reverse2Parts.value) {
      nameResult.value.push(rightPart + 'e' + leftPart)
    } else {
      nameResult.value.push(leftPart + 'e' + rightPart)
    }
  }

  currentResultPageNum.value = 1
  searchingKeyword.value = ''

  nameIsGenerated.value = true
}

const generationIsRandom = computed(() => {
  const leftPartIsLimited = nameOptionsFormValue.leftPart.limited
  const rightPartIsLimited = nameOptionsFormValue.rightPart.limited
  return (
    leftPartIsLimited ||
    nameOptionsFormValue.rightPart.customizedNum === '' ||
    (leftPartIsLimited && !rightPartIsLimited)
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
  return filteredResult.value.slice(firstOneIndex, lastOneIndex)
})

const reverse2Parts = ref<boolean>(false)

const searchingKeyword = ref<string>('')

const filteredResult = computed(() => {
  if (searchingKeyword.value !== '') {
    return nameResult.value.filter((result) => result.includes(searchingKeyword.value))
  }
  return nameResult.value
})

const handleClearResult = () => {
  ElMessageBox.alert('确定要清空结果列表吗？此操作不可逆！', '危险操作', {
    confirmButtonText: 'OK',
    callback: () => {
      nameResult.value = []
      currentResultPageNum.value = 1
      searchingKeyword.value = ''
    },
  })
}
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
          <el-checkbox v-model="nameOptionsFormValue.leftPart.limited" label="限制 e 前部分" />
          <el-checkbox v-model="nameOptionsFormValue.rightPart.limited" label="限制 e 后部分" />
        </el-form-item>
        <!-- Then, handle 2 parts -->
        <!-- leftPart first -->

        <!-- Unlimited -->
        <el-form-item
          label="e 前部分（3 个字符）"
          prop="leftPart.customizedText"
          v-if="!nameOptionsFormValue.leftPart.limited"
        >
          <el-input v-model="nameOptionsFormValue.leftPart.customizedText" />
        </el-form-item>

        <!-- Limited -->
        <el-form-item
          label="e 前部分字母大小写选项（单击某一位置以在该位置启用大写）"
          v-if="nameOptionsFormValue.leftPart.limited"
        >
          <el-checkbox-group v-model="nameOptionsFormValue.leftPart.uppercase">
            <el-checkbox-button
              :value="checkboxBtn"
              v-for="checkboxBtn in 'ABC'"
              :key="checkboxBtn"
            >
              {{
                nameOptionsFormValue.leftPart.uppercase.includes(checkboxBtn)
                  ? checkboxBtn
                  : checkboxBtn.toLowerCase()
              }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <!-- Then rightPart -->
        <!-- Unlimited only -->
        <el-form-item
          label="e 后部分（仅允许 000 - 999）内的 3 位数字（留空以随机生成）"
          prop="rightPart.customizedNum"
          v-if="!nameOptionsFormValue.rightPart.limited"
        >
          <el-input v-model="nameOptionsFormValue.rightPart.customizedNum" placeholder="随机生成" />
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

        <!-- Reverse -->
        <el-form-item label="反转名字左右部分">
          <el-switch v-model="reverse2Parts" />
        </el-form-item>
      </el-form>
      <el-button @click="handleGenerateButtonClick(nameOptionsFormRef)" type="primary"
        >生成</el-button
      >
      <el-divider />
      <h2>
        结果
        <template v-if="nameIsGenerated">
          （{{ filteredResult.length }}/{{ nameResult.length }} 个）
        </template>
      </h2>
      <div>
        <p><i>点击其中一个名字以复制.</i></p>
        <el-space class="toolbar">
          <el-input placeholder="搜索" v-model="searchingKeyword">
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
          <el-button :disabled="!nameIsGenerated" @click="handleCopyNames">复制全部</el-button>
          <el-button :disabled="!nameIsGenerated" @click="handleClearResult" type="danger">
            清空结果
          </el-button>
        </el-space>
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
            :total="filteredResult.length"
            :page-size="100"
            v-model:current-page="currentResultPageNum"
            style="justify-content: center"
          />
        </div>
      </div>
    </el-card>
  </PageLayout>
</template>
