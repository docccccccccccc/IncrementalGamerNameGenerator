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
    class="page-link"
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
.page-link {
  height: 480px;
}

.el-image {
  width: 144px;
  height: 144px;
  border-radius: 16px;
}

.page-name {
  font-size: 1.5em;
}

.link-card-main {
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  white-space: pre-line;
}

@media screen and (max-width: 80vh) {
  .page-link {
    height: 320px;
  }
}
</style>
