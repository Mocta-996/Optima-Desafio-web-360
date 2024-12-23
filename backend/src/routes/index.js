const express = require('express')
const stateRouter = require('./states.router')
const roleRouter = require('./role.router')
const customerRouter = require('./customer.router')
const userRouter = require('./user.router')
const authRouter = require('./auth.router')
const productCategoryRouter = require('./productCategory.router')
const productRouter = require('./product.router')
const orderRouter = require('./order.router')

function routerApi (app) {
  const router = express.Router()
  app.use('/w360/api/v1', router)
  router.use('/states', stateRouter)
  router.use('/roles', roleRouter)
  router.use('/customers', customerRouter)
  router.use('/users', userRouter)
  router.use('/auth', authRouter)
  router.use('/product-categories', productCategoryRouter)
  router.use('/products', productRouter)
  router.use('/orders', orderRouter)
}

module.exports = routerApi
