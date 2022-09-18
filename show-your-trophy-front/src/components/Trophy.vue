<script setup lang="ts">
const props = defineProps([
  'trophyTitles',
  'totalItemCount',
  'savePosterLoading'
])
const visibleType = ref('all')
const trophyTitles = reactive({ trophyTitles: props.trophyTitles })

// 侦听控制显示哪些元素的变化
watch(visibleType, async (newVisibleType) => {
  switch (newVisibleType) {
    case 'all':
      trophyTitles.trophyTitles = props.trophyTitles
      trophyTitles.trophyTitles = props.trophyTitles.filter(
        (trophyInfo: any) => {
          return trophyInfo.hiddenFlag === false
        }
      )
      break
    case 'completed':
      trophyTitles.trophyTitles = props.trophyTitles.filter(
        (trophyInfo: any) => {
          return trophyInfo.hiddenFlag === false && trophyInfo.progress === 100
        }
      )
      break
    case 'platinum':
      trophyTitles.trophyTitles = props.trophyTitles.filter(
        (trophyInfo: any) => {
          return (
            trophyInfo.hiddenFlag === false &&
            trophyInfo.earnedTrophies.platinum >= 1
          )
        }
      )
      break
  }
})
</script>

<template>
  <div>
    <div class="operation-container" v-show="!props.savePosterLoading">
      <el-radio-group class="full-width" v-model="visibleType">
        <el-radio-button class="type-btn" label="all">
          显示全部
        </el-radio-button>
        <el-radio-button class="type-btn" label="completed">
          显示 100%
        </el-radio-button>
        <el-radio-button class="type-btn" label="platinum">
          显示白金
        </el-radio-button>
      </el-radio-group>
      <el-icon
        class="share-btn"
        :size="20"
        @click="$emit('savePoster')"
        v-loading.fullscreen.lock="props.savePosterLoading"
        element-loading-text="生成图片中..."
      >
        <i-ep-share />
      </el-icon>
    </div>

    <div
      class="game-info"
      v-for="(trophy, index) in trophyTitles.trophyTitles"
      :key="index"
    >
      <div class="img-container">
        <el-image
          class="game-icon"
          :src="`/api/image/${
            trophy.npServiceName === 'trophy2' ? 'ps5' : 'ps4'
          }?url=${trophy.trophyTitleIconUrl}`"
          crossorigin="anonymous"
        ></el-image>
      </div>
      <div class="trophy-container">
        <div class="gray-text title">{{ trophy.trophyTitleName }}</div>
        <div class="trophy-list">
          <div class="trophy">
            <el-image
              class="trophy-img"
              src="src/assets/platinum.png"
            ></el-image>
            <div class="gray-text">
              {{ trophy.earnedTrophies.platinum }}
            </div>
          </div>
          <div class="trophy">
            <el-image class="trophy-img" src="src/assets/gold.png"></el-image>
            <div class="gray-text">
              {{ trophy.earnedTrophies.gold }}
            </div>
          </div>
          <div class="trophy">
            <el-image class="trophy-img" src="src/assets/silver.png"></el-image>
            <div class="gray-text">
              {{ trophy.earnedTrophies.silver }}
            </div>
          </div>
          <div class="trophy">
            <el-image class="trophy-img" src="src/assets/bronze.png"></el-image>
            <div class="gray-text">
              {{ trophy.earnedTrophies.bronze }}
            </div>
          </div>
          <div class="progress-number">{{ trophy.progress }}%</div>
        </div>
        <el-progress
          class="progress"
          :percentage="trophy.progress"
          :show-text="false"
          color="#ffffff"
          :stroke-width="2"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.operation-container {
  display: flex;
  align-items: center;
  margin: -1rem 0 1.2rem;
}

.share-btn {
  cursor: pointer;
  margin-left: 0.5rem;
}

.game-info {
  display: flex;
  margin-top: 1.5rem;
}

.type-btn {
  width: calc(100% / 3);
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: #1e2e53;
  border-color: #1e2e53;
  box-shadow: -1px 0 0 0 #1e2e53;
}

:deep(.el-radio-button__inner) {
  width: 100%;
}

:deep(.el-radio-button__inner):hover {
  color: #4875dd;
}

.img-container {
  display: flex;
  height: 90px;
  align-items: center;
}

.game-icon {
  width: 90px;
  border-radius: 0.5rem;
}

.trophy-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 0.5rem;
}

.trophy-container .title,
.trophy-container .progress {
  margin-left: 0.3rem;
}

.gray-text {
  color: #c0c4cc;
  font-size: 0.9rem;
}

.trophy-list {
  display: flex;
}

.trophy-list .progress-number {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.trophy-img {
  width: 30px;
  height: 30px;
}

.trophy .gray-text {
  text-align: center;
}
</style>
