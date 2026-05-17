<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { RouterLink } from 'vue-router'
import PageLink from '@/components/PageLink.vue'
</script>

<template>
  <PageLayout>
    <template #header>增量游戏玩家名字生成器</template>
    <el-row :gutter="32">
      <el-col :span="8">
        <RouterLink to="/cel">
          <PageLink page-name="“..., the Celestial of ...” 式" img-src="/images/cel.png" />
        </RouterLink>
      </el-col>
      <el-col :span="8">
        <RouterLink to="/e308">
          <PageLink page-name="“...e308” 式" img-src="/images/e308.jpg" />
        </RouterLink>
      </el-col>
      <el-col :span="8">
        <RouterLink to="/cel">
          <PageLink page-name="关于本项目" img-src="/images/logo.png" />
        </RouterLink>
      </el-col>
    </el-row>
  </PageLayout>
</template>
