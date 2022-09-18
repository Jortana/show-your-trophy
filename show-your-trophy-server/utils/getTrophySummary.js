const { getUserTrophyProfileSummary } = require('psn-api')

const getTrophySummary = async (authorization, accountId) => {
  const response = await getUserTrophyProfileSummary(authorization, accountId)
  return response
}

module.exports = getTrophySummary
