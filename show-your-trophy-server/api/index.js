const express = require('express')

const router = express.Router()

// 认证相关 api
router.use('/auth', require('./auth'))

// 奖杯相关 api
router.use('/trophy', require('./trophy'))

// 游戏相关 api
router.use('/game', require('./game'))

// 图片转发 api
router.use('/image', require('./image'))

module.exports = router
