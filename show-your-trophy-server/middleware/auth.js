const { getAccessToken } = require('../utils/trophy')
// const { Authorization } = require('../models')

/**
 * 验证认证信息是否有效
 * 无效响应 401 状态码
 * 有效把认证信息读取出来挂载到 req 请求对象上继续往后执行
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = async (req, res, next) => {
  const { npsso } = req.query
  try {
    const authorization = await getAccessToken(npsso)
    if (authorization !== null) {
      req.authorization = authorization
    } else {
      return res.status(401).send('认证信息已过期')
    }
  } catch (err) {
    // await Authorization.findOneAndRemove({ npsso })
    return res
      .status(401)
      .send({ err, message: '请稍等后重试或重新获取 npsso' })
  }

  next()
}
