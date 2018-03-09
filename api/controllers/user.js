const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

module.exports = {
  user_signup: async(ctx, next) => {
    let users = await User.find({email: ctx.request.body.email}).exec()
    if (users.length >= 1) {
      ctx.status = 409
      ctx.message = 'Mail Exist!'
    } else {
      const hash = bcrypt.hashSync(ctx.request.body.password, 10)
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: ctx.request.body.email,
        password: hash
      })
      let new_user = await user.save()
      try {
        ctx.body = {
          _id: new_user._id,
          email: new_user.email,
          password: new_user.password
        }
      } catch (error) {
        next(error)
      }
    }
  },

  user_login: async(ctx, next) => {
    let users = await User.find({ email: ctx.request.body.email }).exec()
    if (users.length < 1) {
      ctx.status = 409
      ctx.message = 'Auth failed'
    } else {
      const hash = bcrypt.compare(ctx.request.body.password, users[0].password)
      if (hash) {
        const token = jwt.sign(
          { email: users[0].email, userId: users[0]._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        )
        ctx.body = {
          message: "Auth successful",
          token: token
        }
      } else {
        ctx.status = 409
        ctx.message = 'Auth failed'
      }
    }
  },

  user_delete: async(ctx, next) => {
    try {
      let deleted_use = await User.remove({ _id: ctx.params.userId }).exec()
      ctx.body = {
        message: 'User deleted'
      }
    } catch (error) {
      ctx.throw(500, error)
    }
  }
}