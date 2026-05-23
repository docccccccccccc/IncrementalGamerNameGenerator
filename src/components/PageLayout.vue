<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>

<template>
  <el-container>
    <el-header height="auto">
      <h1>
        <el-button size="large" @click="toggleDark()"
          >切换为{{ isDark ? '浅色' : '深色' }}模式</el-button
        >
        <slot name="header"></slot>
      </h1>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
    <el-footer height="auto">
      <p>Made by <el-link href="https://doctypehtml.top">doctypehtml</el-link></p>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  text-align: center;
}
</style>
