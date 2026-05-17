<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import PageLayout from './components/PageLayout.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <PageLayout>
      <template #header>312</template>
      12312312
    </PageLayout>
  </el-config-provider>
</template>

<style scoped></style>
