const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth')
const getUser = require('../middleware/get-user')
const trophyController = require('../controller/trophy')

// 获取自己的奖杯 summary
router.get('/summary/self', auth, trophyController.getSelfSummary)

// 根据用户名获取奖杯 summary
router.get('/summary/user', auth, getUser, trophyController.getUserSummary)

// 获取自己的所有游戏和成就
router.get('/self', auth, trophyController.getSelfAllTrophies)

// 根据 accountId 获取用户的所有游戏和成就
router.get('/user', auth, getUser, trophyController.getUserAllTrophies)

module.exports = router
