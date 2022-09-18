const {
  exchangeNpssoForCode,
  exchangeCodeForAccessToken,
  exchangeRefreshTokenForAuthTokens
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
  const accessCode = await exchangeNpssoForCode(npsso)
  // 取当前的认证信息
  let authorization = await Authorization.findOne({ npsso })
  if (authorization === null) {
    // 如果没有信息则进行认证
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

module.exports = { getAccessToken }
