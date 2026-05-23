<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
      <el-divider />
      <p class="name-style-preview"></p>
      <el-form>
        <el-form-item label="取名模式">
          <el-radio-group>
            <el-radio-button label="我自己取" value="free" />
            <el-radio-button label="帮我生成" value="generative" />
          </el-radio-group>
        </el-form-item>
        <template>
          <el-form-item label="前半部分（仅允许字母）">
            <el-input />
          </el-form-item>
          <el-form-item label="后半部分（仅允许 000 - 999）内的数字">
            <el-input />
          </el-form-item>
        </template>
        <template>
          <el-form-item label="前半部分字母大小写选项">
            <el-checkbox-group>
              <el-checkbox-button>X</el-checkbox-button>
              <el-checkbox-button>x</el-checkbox-button>
              <el-checkbox-button>X</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <el-form-item label="限制后半部分数字为 308">
          <el-switch />
        </el-form-item>
      </el-form>
    </el-card>
  </PageLayout>
</template>
