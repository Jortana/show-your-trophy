<script setup lang="ts">
import { getAssetsFile } from '@/utils/pub-use'
</script>

<template>
  <div class="header">
    <el-avatar :src="getAssetsFile('999.png')" />
    <div class="title">Show Your Trophy</div>
    <!-- <el-button type="primary">登录</el-button> -->
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'TheropodsDemoBold';
  src: url('../assets/fonts/TheropodsDemoBold.ttf') format('truetype');
}
.header {
  display: flex;
  /* justify-content: space-between; */
  align-items: flex-end;
  /* padding: 1rem 0; */
}

.title {
  font-family: 'TheropodsDemoBold';
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
  margin-bottom: -2px;
}
</style>
