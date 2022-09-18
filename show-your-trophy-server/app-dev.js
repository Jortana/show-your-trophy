const express = require('express')
const http = require('http')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./api')
const errorHandler = require('./middleware/error-handler')
require('./models')

const app = express()

// 日志输出
app.use(morgan('dev'))

// 解析 json 格式请求体
app.use(express.json())

// 为客户端提供跨域资源请求
const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || 9005

// 挂载路由
app.use('/api', router)

// 挂载统一处理服务端错误中间件
app.use(errorHandler())

const httpServer = http.createServer(app)

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
