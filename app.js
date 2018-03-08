const Koa = require('koa')
const app = new Koa()
const dotenv = require('dotenv')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('./router')
const mongoose = require('mongoose')

dotenv.config()

app.use(bodyParser())
app.use(logger())

mongoose.connect(process.env.DATABASE)

router(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})