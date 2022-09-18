const mongoose = require('mongoose')

const authorizationSchema = new mongoose.Schema({
  npsso: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  expiresIn: {
    type: Number,
    required: true
  },
  idToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  refreshTokenExpiresIn: {
    type: Number,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  tokenType: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: new Date()
  }
})

module.exports = authorizationSchema
