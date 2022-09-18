const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth')
const getUser = require('../middleware/get-user')
const gameController = require('../controller/game')

// 获取自己的所有游戏
router.get('/self', auth, gameController.getSelfAllGames)

// 根据用户名获取所有游戏
router.get('/user', auth, getUser, gameController.getUserAllGames)

module.exports = router
