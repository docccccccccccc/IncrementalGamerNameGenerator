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
      <p>
        GitHub Profile:
        <el-link href="https://github.com/docccccccccccc">docccccccccccc (doctypehtml)</el-link>
      </p>
      <p>
        GitHub repository for this project:
        <el-link href="https://github.com/docccccccccccc/IncrementalGamerNameGenerator">
          docccccccccccc/IncremetalGamerNameGenerator
        </el-link>
      </p>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  text-align: center;
}
</style>
