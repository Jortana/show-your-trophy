const {
  exchangeNpssoForCode,
  exchangeCodeForAccessToken,
  exchangeRefreshTokenForAuthTokens,
  getProfileFromUserName,
  getProfileFromAccountId,
  getUserTrophyProfileSummary,
  getUserTitles
} = require('psn-api')
const { Authorization } = require('../models')

/**
 * 判断认证是否过期
 * @param {*} authorization
 * @returns
 */
const expired = (authorization) => {
  // const authorization = await exchangeCodeForAccessToken(accessCode)
  const now = new Date()
  const expirationDate = new Date(
    authorization.createTime.getTime() + authorization.expiresIn * 1000
  ).toISOString()
  const isAccessTokenExpired =
    new Date(expirationDate).getTime() < now.getTime()
  return isAccessTokenExpired
}

/**
 * 认证
 */
const getAccessToken = async (npsso) => {
  // 取当前的认证信息
  let authorization = await Authorization.findOne({ npsso })
  if (authorization === null) {
    // 如果没有信息则进行认证
    const accessCode = await exchangeNpssoForCode(npsso)
    const newAuthorization = await exchangeCodeForAccessToken(accessCode)
    newAuthorization.npsso = npsso
    await new Authorization(newAuthorization).save()
    authorization = newAuthorization
  } else if (expired(authorization) === true) {
    // 过期了也进行认证
    const updatedAuthorization = await exchangeRefreshTokenForAuthTokens(
      authorization.refreshToken
    )
    await Authorization.findOneAndRemove({ npsso })
    updatedAuthorization.npsso = npsso
    await new Authorization(updatedAuthorization).save()
    authorization = updatedAuthorization
  }
  return authorization
}

/**
 * 根据 accountId 获取玩家奖杯 summary
 * @param {*} authorization
 * @param {*} accountId
 * @returns
 */
const getTrophySummary = async (authorization, accountId) => {
  const response = await getUserTrophyProfileSummary(authorization, accountId)
  return response
}

/**
 * 根据用户名获取用户信息
 * @param {*} authorization
 * @param {*} username
 * @returns
 */
const getProfileByUsername = async (authorization, username) => {
  const response = await getProfileFromUserName(authorization, username)
  return response
}

/**
 * 根据 accountId 获取用户信息
 * @param {*} authorization
 * @param {*} accountId
 * @returns
 */
const getProfileById = async (authorization, accountId) => {
  const response = await getProfileFromAccountId(authorization, accountId)
  return response
}

/**
 * 根据 accountId 获取玩家所有游戏和成就
 * @param {*} authorization
 * @param {*} accountId
 * @returns
 */
const getAllTrophies = async (authorization, accountId) => {
  const response = await getUserTitles(authorization, accountId)
  return response
}

module.exports = {
  getAccessToken,
  getTrophySummary,
  getProfileByUsername,
  getProfileById,
  getAllTrophies
}
