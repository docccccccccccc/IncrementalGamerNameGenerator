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
    <span>名字样式 1</span>
  </PageLayout>
</template>
