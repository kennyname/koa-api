const mongoose = require('mongoose')
const Product = require('../models/product')

module.exports = {
  get_products: async(ctx, next) => {
    let all_products = await Product.find().exec()
    try {
      const response = {
        count: all_products.length,
        products: all_products.map(product => {
          return {
            name: product.name,
            price: product.price,
            productImage: product.productImage,
            _id: product._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + product._id
            }
          }
        })
      }
      ctx.status = 200
      ctx.body = response
    } catch (error) {
      ctx.throw(500, error)
    }
  },
  
  get_product: async(ctx, next) => {
    let get_product = await Product.findById(ctx.params.product_id).exec()
    try {
      if (get_product) {
        ctx.status = 200
        ctx.body = {
          product: get_product,
          request: {
            type: "GET",
            url: "http://localhost:3000/products"
          }
        }
      } else {
        ctx.status = 404
        ctx.body = {
          message: "No valid entry found for provided ID"
        }
      }
    } catch (error) {
      ctx.throw(500, error)
    }

  },

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
          productImage: new_product.productImage,
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