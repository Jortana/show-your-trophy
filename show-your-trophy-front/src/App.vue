<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<template>
  <el-scrollbar height="100vh">
    <div class="common-layout">
      <el-container class="main-container">
        <el-header class="header-container">
          <GlobalHeader />
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <!-- <el-footer class="footer">Footer</el-footer> -->
      </el-container>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.common-layout {
  min-height: 100vh;
  background-color: #1c1d1f;
}

.header-container {
  height: 100%;
  margin-top: 1.5rem;
}

.main-container {
  max-width: 400px;
  margin: 0 auto;
  height: 100%;
  min-height: 100vh;
  background-color: #141414;
}

.main {
  padding: 0;
}
</style>
