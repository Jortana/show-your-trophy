const http = require('http')
const https = require('https')
// const request = require('request')
const { getAllGames } = require('../utils/trophy')

/**
 * 获取自己的所有游戏和成就
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getSelfAllGames = async (req, res, next) => {
  try {
    const { authorization } = req
    const trophyTitles = await getAllGames(authorization, 'me')
    res.status(200).send(trophyTitles)
  } catch (err) {
    next(err)
  }
}

/**
 * 根据 accountId 获取用户的所有游戏和成就
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getUserAllGames = async (req, res, next) => {
  try {
    const { authorization, profile } = req
    const trophyTitles = await getAllGames(authorization, profile.accountId)
    res.status(200).send(trophyTitles)
  } catch (err) {
    next(err)
  }
}

/**
 * 请求并返回图片资源
 * @param {String} url 图片地址
 */
// async function proxyFetchImage(url) {
//   const res = await fetch(url, {
//     method: 'get',
//     responseType: 'arraybuffer'
//   })
//   return res
// }

/**
 * 转发图片绕过跨域限制
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getImage = async (req, res, next) => {
  try {
    const { url } = req.query
    if (!url) {
      res.status(404).send()
    }
    let rawData = ''
    if (url.split('://')[0] === 'https') {
      https.get(url, (sres) => {
        if (sres.statusCode !== 200) {
          throw new Error()
        }

        sres.setEncoding('binary')
        sres.on('data', (chunk) => {
          rawData += chunk
        })
        sres.on('end', () => {
          res.set('Cache-Control', 'private, no-transform, max-age=43200')
          res.write(rawData, 'binary')
          res.end(Buffer.from(rawData, 'binary'))
        })
      })
    } else {
      http.get(url, (sres) => {
        if (sres.statusCode !== 200) {
          throw new Error()
        }

        sres.setEncoding('binary')
        sres.on('data', (chunk) => {
          rawData += chunk
        })
        sres.on('end', () => {
          res.set('Cache-Control', 'private, no-transform, max-age=43200')
          res.write(rawData, 'binary')
          res.end(Buffer.from(rawData, 'binary'))
        })
      })
    }
  } catch (err) {
    next(err)
  }
}
