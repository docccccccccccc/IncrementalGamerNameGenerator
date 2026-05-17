<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <PageLayout>
    <template #header>
      <el-button size="large" @click="router.replace('/')">回到主页</el-button>
      关于本项目
    </template>
    <div>
      <el-image src="/images/logo.png" />
      <p>
        作者 GitHub 主页：
        <el-link href="https://github.com/docccccccccccc">docccccccccccc (doctypehtml)</el-link>
      </p>
      <p>
        项目 GitHub 仓库:
        <el-link href="https://github.com/docccccccccccc/IncrementalGamerNameGenerator">
          docccccccccccc/IncremetalGamerNameGenerator
        </el-link>
      </p>
    </div>
  </PageLayout>
</template>

<style lang="scss" scoped>
.el-image {
  width: 144px;
  height: 144px;
  border-radius: 16px;
}
</style>
