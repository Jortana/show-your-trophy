const { getUserTitles } = require('psn-api')

const getAllGames = async (authorization, accountId) => {
  const response = await getUserTitles(authorization, accountId)
  return response
}

module.exports = getAllGames
