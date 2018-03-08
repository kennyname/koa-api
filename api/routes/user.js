const router = require('koa-router')()
const UserController = require('../controllers/user')

const routers = router
  .post("/signup", UserController.user_signup)
  .post("/login", UserController.user_login)
  .delete("/:userId", UserController.user_delete)

module.exports = routers