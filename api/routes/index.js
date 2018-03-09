const router = require('koa-router')()
const user = require('./user')
const product = require('./product')

router.use('/user', user.routes(), user.allowedMethods())
router.use('/products', product.routes(), product.allowedMethods())


module.exports = router