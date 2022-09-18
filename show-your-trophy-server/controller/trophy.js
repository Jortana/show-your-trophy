const {
  getTrophySummary,
  getProfileById,
  getAllTrophies
} = require('../utils/trophy')

const resBuilder = require('../utils/resBuilder')

/**
 * 获取自己的奖杯 summary
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getSelfSummary = async (req, res, next) => {
  try {
    const { authorization } = req
    const summary = await getTrophySummary(authorization, 'me')
    const profile = await getProfileById(authorization, summary.accountId)
    res.status(200).json(resBuilder.successRes({ profile, summary }))
  } catch (err) {
    next(err)
  }
}

/**
 * 根据用户名获取用户的奖杯 summary
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getUserSummary = async (req, res, next) => {
  try {
    const { authorization, profile } = req
    const summary = await getTrophySummary(authorization, profile.accountId)
    res.status(200).json(resBuilder.successRes({ profile, summary }))
  } catch (err) {
    next(err)
  }
}

/**
 * 获取自己的所有游戏和成就
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getSelfAllTrophies = async (req, res, next) => {
  try {
    const { authorization } = req
    const trophyTitles = await getAllTrophies(authorization, 'me')
    res.status(200).json(resBuilder.successRes(trophyTitles))
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
exports.getUserAllTrophies = async (req, res, next) => {
  try {
    const { authorization, profile } = req
    const trophyTitles = await getAllTrophies(authorization, profile.accountId)
    res.status(200).json(resBuilder.successRes(trophyTitles))
  } catch (err) {
    next(err)
  }
}
