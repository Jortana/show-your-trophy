<script setup lang="ts">
import html2canvas from 'html2canvas'

import Canvas2Image from '@/utils/canvas2Image.js'

import Summary from '@/components/Summary.vue'
import Trophy from '@/components/Trophy.vue'

const props = defineProps([
  'profile',
  'summary',
  'trophyTitles',
  'totalItemCount'
])
console.log(props)

const savePosterLoading = ref(false)
const screenViewBox: any = ref<InstanceType<typeof HTMLDivElement>>()

async function savePoster() {
  // 打开loading
  savePosterLoading.value = true

  await nextTick()
  //生成图片之前，需先将整体的滚动条隐藏掉，否则生成出来的照片会偏移
  // let app = document.getElementById('app')
  // if (app === null) {
  //   return
  // }
  // app.style.overflowY = 'hidden'
  // 两个参数：所需要截图的元素id，截图后要执行的函数，canvas为截图后返回的最后一个canvas
  // const shareContent = document.getElementById('screenViewBox')
  const shareContent = screenViewBox.value
  if (shareContent === null) {
    return
  }
  const width = shareContent.offsetWidth
  const height = shareContent.offsetHeight
  const canvas = document.createElement('canvas')
  const scale = 5 // 这里为了下载出更清晰的图片，值越大越清晰

  canvas.width = width * scale
  canvas.height = height * scale
  canvas.getContext('2d')?.scale(scale, scale)

  const opts = {
    scale: 1, //不管上面的scale是多少倍，这里只能取1，否则会显示不完全
    canvas: canvas,
    logging: true,
    width: width,
    height: height,
    backgroundColor: '#141414'
    // useCORS: true
  }
  const downloadName = props.profile.onlineId
  html2canvas(shareContent, opts).then((canvas) => {
    // 直接将canvas保存为图片
    const img = Canvas2Image.saveAsImage(
      canvas,
      canvas.width,
      canvas.height,
      'png',
      downloadName
    )
    // 这个方式只是提供展示图片的功能，暂时没有用到
    // const img1 = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height)

    // 关闭 loading
    savePosterLoading.value = false
  })
}
</script>

<template>
  <div id="screen-view-box" ref="screenViewBox">
    <Summary :profile="props.profile" :summary="props.summary" />
    <Trophy
      class="game-info-container"
      :trophyTitles="props.trophyTitles"
      :totalItemCount="props.totalItemCount"
      :savePosterLoading="savePosterLoading"
      @savePoster="savePoster"
    />
  </div>
</template>

<style scoped>
.game-info-container {
  margin-top: 2rem;
}

#screen-view-box {
  padding: 20px;
}
</style>
