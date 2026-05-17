<template>
  <el-container>
    <el-header height="auto">
      <h1>
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
