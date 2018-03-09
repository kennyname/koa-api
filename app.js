const Koa = require('koa')
const app = new Koa()
const dotenv = require('dotenv')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const router = require('./api/routes/index')
const mongoose = require('mongoose')


dotenv.config()
app.use(cors())
app.use(koaBody({
  formidable:{uploadDir: "./uploads"},    //This is where the files would come
  multipart: true,
  urlencoded: true
}))
app.use(bodyParser())
app.use(logger())
app.use(router.routes()).use(router.allowedMethods())

mongoose.connect(process.env.DATABASE)


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})