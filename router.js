const router = require('koa-router')()
const UserController = require('./api/controllers/user')
module.exports = (app) => {
  router.post("/user/signup", UserController.user_signup)
  router.post("/user/login", UserController.user_login)
  router.delete("/user/:userId", UserController.user_delete)

  app.use(router.routes())
    .use(router.allowedMethods())
}
