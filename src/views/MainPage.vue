<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <PageLayout>
    <template #header>增量游戏玩家名字生成器</template>
    <RouterLink to="/e308">名字样式 1</RouterLink>
    <RouterLink to="/cel">名字样式 1</RouterLink>
  </PageLayout>
</template>
