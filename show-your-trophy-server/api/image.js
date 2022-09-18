const express = require('express')
const proxy = require('express-http-proxy')

const router = express.Router()

const gameController = require('../controller/game')

// 获取转发的图片
router.get('/', gameController.getImage)

// 代理转发图片
router.get(
  '/ps4',
  proxy('https://image.api.playstation.com', {
    proxyReqPathResolver(req) {
      const { url } = req.query
      return url
    },
    https: true
  })
)

router.get(
  '/ps5',
  proxy('https://psnobj.prod.dl.playstation.net', {
    proxyReqPathResolver(req) {
      const { url } = req.query
      return url
    },
    https: true
  })
)

module.exports = router
