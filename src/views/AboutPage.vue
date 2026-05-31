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
      <h2>增量玩家名字生成器</h2>
      <h4>V1.0.0</h4>
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
      <p>
        作者 B 站主页:
        <el-link href="https://space.bilibili.com/3546694681626801"> doctype-html </el-link>
      </p>
      <p>
        作者爱发电主页:
        <el-link href="https://afdian.com/a/doctypehtml"> doctypehtml </el-link>
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
