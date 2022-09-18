const getAccessToken = require('../utils/getAccessToken')

exports.auth = async (req, res, next) => {
  try {
    const { success } = await getAccessToken()
    res.status(200).send({ success })
  } catch (err) {
    next(err)
  }
}
