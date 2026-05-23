<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import { RouterLink } from 'vue-router'
import PageLink from '@/components/PageLink.vue'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const useVerticalLayout = ref(window.innerWidth <= window.innerHeight * 0.8)

const handleResize = () => {
  useVerticalLayout.value = window.innerWidth <= window.innerWidth * 0.8
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const direction = computed(() => {
  console.log(useVerticalLayout.value)
  return useVerticalLayout.value ? 'vertical' : 'horizontal'
})
</script>

<template>
  <PageLayout>
    <template #header>增量玩家名字生成器</template>
    <el-space
      :fill="useVerticalLayout"
      wrap
      :direction="direction"
      :style="{
        width: '100%',
        justifyContent: 'center',
      }"
      prefix-cls="page-link-item"
    >
      <RouterLink to="/cel">
        <PageLink page-name="“..., the Celestial of ...” 式" img-src="/images/cel.png" />
      </RouterLink>
      <RouterLink to="/e308">
        <PageLink page-name="“...e308” 式" img-src="/images/e308.jpg" />
      </RouterLink>
      <RouterLink to="/about">
        <PageLink page-name="关于本项目" img-src="/images/logo.png" />
      </RouterLink>
    </el-space>
  </PageLayout>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 80svh) {
  .el-space > * {
    width: 32%;
  }
}
@media screen and (max-width: 80svh) {
  .el-space > * {
    width: 100%;
  }
}
</style>
