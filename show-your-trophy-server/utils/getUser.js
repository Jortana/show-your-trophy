const { getProfileFromUserName } = require('psn-api')

module.exports = async (authorization, userName) => {
  const response = await getProfileFromUserName(authorization, userName)
  return response
}
