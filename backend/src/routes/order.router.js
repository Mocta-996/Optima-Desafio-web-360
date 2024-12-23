/**
 * ES: Ruta de pedidos
 * EN: Order route
 */

const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const validatorHandler = require('../middlewares/validation.handler')
const { orderSchema, idOrderSchema, updateOrderStatusSchema } = require('../schemas/order.schema')
const { verifyTokenHandler, verifyRoleHandler, checkStatusUserHandler } = require('../middlewares/checkauth.handler')

router.get('/ping', orderController.pong)
router.post('/register', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador', 'Cliente'), validatorHandler(orderSchema), orderController.registerOrder)
router.put('/update-status/:idOrden', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(idOrderSchema,'params'), validatorHandler(updateOrderStatusSchema), orderController.updateOrderStatus)
router.get('/get', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador', 'Cliente'), orderController.getOrders)
module.exports = router