const authorization = await exchangeCodeForAccessToken(accessCode)

const now = new Date()
const expirationDate = new Date(
  now.getTime() + authorization.expiresIn * 1000
).toISOString()

const isAccessTokenExpired = new Date(expirationDate).getTime() < now.getTime()

if (isAccessTokenExpired) {
  const updatedAuthorization = await exchangeRefreshTokenForAuthTokens(
    authorization.refreshToken
  )
}
