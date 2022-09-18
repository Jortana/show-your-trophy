<script setup lang="ts">
const props = defineProps(['profile', 'summary'])

const totalTrophy = Object.values(props.summary.earnedTrophies).reduce(
  (pre: any, cur: any) => pre + cur
)

// computed(()=>props.summary.trophyLevel)
/** 
const levelImage = computed(() => {
  if (props.summary.trophyLevel <= 99) {
    return '1-99'
  } else if (props.summary.trophyLevel <= 199) {
    return '100-199'
  } else if (props.summary.trophyLevel <= 299) {
    return '200-299'
  } else if (props.summary.trophyLevel <= 399) {
    return '300-399'
  } else if (props.summary.trophyLevel <= 499) {
    return '400-499'
  } else if (props.summary.trophyLevel <= 599) {
    return '500-599'
  } else if (props.summary.trophyLevel <= 699) {
    return '600-699'
  } else if (props.summary.trophyLevel <= 799) {
    return '700-799'
  } else if (props.summary.trophyLevel <= 998) {
    return '800-998'
  } else {
    return '999'
  }
})
*/

interface avatar {
  size: string
  url: string
}
</script>

<template>
  <div>
    <div class="avatar-container">
      <el-avatar
        :size="40"
        class="avatar"
        :src="`/api/image?url=${props.profile.avatars.filter((avatar: avatar) => avatar.size === 'l')[0].url}`"
        crossorigin="anonymous"
      />
      <div>
        <div class="online-id">
          {{ props.profile.onlineId }}
        </div>
        <div class="name">
          {{ props.profile.personalDetail.firstName }}
          {{ props.profile.personalDetail.lastName }}
        </div>
      </div>
    </div>
    <div class="summary-container">
      <div class="level-container" v-if="false">
        <div class="level">
          <!-- <el-image class="level-img" :src="`src/assets/${levelImage}.png`" /> -->
          <div class="gray-text">级别 {{ props.summary.trophyLevel }}</div>
        </div>
        <div class="trophy-number">
          <div>{{ totalTrophy }}</div>
          <div class="gray-text">奖杯总数</div>
        </div>
      </div>
      <div class="trophy-container">
        <div class="trophy">
          <el-image class="trophy-img" src="src/assets/platinum.png"></el-image>
          <div class="gray-text">
            {{ props.summary.earnedTrophies.platinum }}
          </div>
        </div>
        <div class="trophy">
          <el-image class="trophy-img" src="src/assets/gold.png"></el-image>
          <div class="gray-text">
            {{ props.summary.earnedTrophies.gold }}
          </div>
        </div>
        <div class="trophy">
          <el-image class="trophy-img" src="src/assets/silver.png"></el-image>
          <div class="gray-text">
            {{ props.summary.earnedTrophies.silver }}
          </div>
        </div>
        <div class="trophy">
          <el-image class="trophy-img" src="src/assets/bronze.png"></el-image>
          <div class="gray-text">
            {{ props.summary.earnedTrophies.bronze }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-container {
  display: flex;
  align-items: center;
  color: rgb(204, 208, 214);
}

.avatar {
  margin-right: 0.6rem;
}

.online-id {
  font-size: 0.6rem;
}

.name {
  font-size: 1rem;
}

.summary-container {
  margin-top: 1.5rem;
}

.level-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.level,
.trophy-number,
.trophy {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.level-img {
  margin-bottom: 0.5rem;
}

.gray-text {
  color: #c0c4cc;
  font-size: 0.9rem;
}

.trophy-number > div:first-child {
  font-size: 1.2rem;
  padding-bottom: 0.2rem;
}

.trophy-container {
  display: flex;
  justify-content: space-around;
}

.trophy-img {
  width: 70px;
  height: 70px;
}
</style>
