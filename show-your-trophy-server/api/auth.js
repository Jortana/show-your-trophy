const express = require('express')

const router = express.Router()

const authController = require('../controller/auth')

// 认证
router.get('/', authController.auth)

module.exports = router
