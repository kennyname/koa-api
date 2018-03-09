const mongoose = require('mongoose')
const Product = require('../models/product')

module.exports = {
  create_product: async(ctx, next) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: ctx.request.body.fields.name,
      price: ctx.request.body.fields.price,
      productImage: ctx.request.body.files.productImage.path
    })
    let new_product = await product.save()
    try {
      ctx.status = 201
      ctx.body = {
        message: "Created product successfully",
        createdProduct: {
          name: new_product.name,
          price: new_product.price,
          _id: new_product._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + new_product._id
          }
        }
      }
    } catch (error) {
      ctx.throw(500, error)
    }
  }
}