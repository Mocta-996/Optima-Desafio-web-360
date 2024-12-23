/**
 * ES: Controlador de la entidad Cliente
 * ENG: Controller for the Customer entity
 */

const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer.controller')
const validatorHandler = require('../middlewares/validation.handler')
const { customerSchema, idCustomerSchema } = require('../schemas/customer.schema')
const { verifyTokenHandler, verifyRoleHandler, checkStatusUserHandler } = require('../middlewares/checkauth.handler')

router.get('/ping', customerController.pong)
router.post('/register', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(customerSchema), customerController.registerCustomer)
router.put('/update/:idCliente', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(idCustomerSchema, 'params'), validatorHandler(customerSchema), customerController.updateCustomer)
router.get('/get', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), customerController.getCustomers)

module.exports = router
