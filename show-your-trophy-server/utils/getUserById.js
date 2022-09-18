const { getProfileFromAccountId } = require('psn-api')

module.exports = async (authorization, accountId) => {
  const response = await getProfileFromAccountId(authorization, accountId)
  return response
}
