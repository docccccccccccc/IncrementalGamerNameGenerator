<script lang="ts" setup>
defineProps<{
  pageName: string
  imgSrc: string
}>()
</script>

<template>
  <el-card
    :body-style="{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }"
    shadow="hover"
  >
    <div class="link-card-main">
      <el-image :src="imgSrc">
        <template #placeholder>
          <span>
            {{ pageName }}
          </span>
        </template>
      </el-image>
      <div>
        <span class="page-name">{{ pageName }}</span>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  height: 480px;
}

.el-image {
  width: 144px;
  height: 144px;
  border-radius: 16px;
}

.page-name {
  font-size: 32px;
}

.link-card-main {
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
}
</style>
