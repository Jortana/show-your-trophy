<script setup lang="ts">
import TrophyStatus from '@/components/TrophyStatus.vue'

import { getSelfSummary, getSelfAllTrophies } from '@/api/trophy'

interface trophyDataRes {
  profile: any
  summary: any
}

interface allTrophiesData {
  trophyTitles: Array<any> | undefined
  totalItemCount: number
}

const npsso = ref('')
const statusVisible = ref(false)
const summaryData: trophyDataRes = reactive({
  profile: {},
  summary: {}
})
const allTrophiesData: allTrophiesData = reactive({
  trophyTitles: [],
  totalItemCount: 0
})

async function getData() {
  try {
    const summaryRes = await getSelfSummary({
      npsso: npsso.value
    })
    console.log(summaryRes)
    summaryData.profile = summaryRes.data?.profile
    summaryData.summary = summaryRes.data?.summary

    const allTrophiesRes = await getSelfAllTrophies({
      npsso: npsso.value
    })
    allTrophiesData.trophyTitles = allTrophiesRes.data?.trophyTitles

    statusVisible.value = true
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="npsso-container">
    <el-input
      v-model="npsso"
      type="password"
      placeholder="请输入你的 npsso"
      clearable
      show-password
      @keypress.enter="getData"
    />

    <el-button
      id="trophy-submit"
      color="#15213a"
      :isDark="true"
      @click="getData"
    >
      获取奖杯
    </el-button>
  </div>
  <div class="manual" v-if="!statusVisible">
    <div>
      <p>Show Your Trophy 永久开源免费</p>
      <p>本应用旨在帮助 PlayStation 用户可以更好地展示自己的奖杯情况</p>
    </div>
    <h2>使用说明</h2>
    <ol>
      <li>
        访问
        <a href="https://www.playstation.com/zh-hans-cn/" target="_blank"
          >PlayStation 官网并登录
        </a>
      </li>
      <li>
        访问
        <a href="https://ca.account.sony.com/api/v1/ssocookie">这个网址</a>
        并复制 npsso 的值
      </li>
      <li>在上方的输入框填入你的 npsso 值</li>
      <li>点击 获取奖杯 按钮</li>
      <li>
        选择合适的选项卡，点击
        <el-icon class="share-btn" :size="20">
          <i-ep-share />
        </el-icon>
        生成图片并下载
      </li>
    </ol>
    <p>如果出现图片加载不出来的现象可以尝试切换选项卡或者重新获取奖杯</p>
  </div>
  <TrophyStatus
    v-if="statusVisible"
    :profile="summaryData.profile"
    :summary="summaryData.summary"
    :trophyTitles="allTrophiesData.trophyTitles"
    :totalItemCount="allTrophiesData.totalItemCount"
  />
</template>

<style scoped>
.npsso-container {
  padding: 20px;
  display: flex;
}

#trophy-submit {
  margin-left: 0.5rem;
}

.manual {
  padding: 0 20px;
}

.manual h2 {
  margin: 0;
}

.manual a {
  color: #86a5ec;
}

.manual ol li {
  margin-bottom: 0.5rem;
}
.manual .share-btn {
  position: relative;
  bottom: -4px;
}
</style>
