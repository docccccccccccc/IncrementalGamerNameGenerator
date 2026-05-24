<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <PageLayout>
    <template #header>
      <el-button size="large" @click="router.replace('/')">回到主页</el-button>
      “..., the Celestial of ...” 式名字
    </template>
    <el-card>
      <h2>敬请期待</h2>
    </el-card>
  </PageLayout>
</template>
