const { getProfileFromUserName } = require('psn-api')

/**
 * 获取要查询的用户名
 * 用户名无效响应 404 状态码
 * 用户名有效把用户信息读取出来挂载到 req 请求对象上继续往后执行
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = async (req, res, next) => {
  const { authorization } = req
  const { username } = req.query
  try {
    const { profile } = await getProfileFromUserName(authorization, username)
    req.profile = profile
  } catch (err) {
    return res.status(404).send({ err, message: '用户名不存在' })
  }

  next()
}
