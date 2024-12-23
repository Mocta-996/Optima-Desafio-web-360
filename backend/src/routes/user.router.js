/**
 * ES: Controlador para la entidad de usuarios
 * EN: User entity controller
 */

const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const validatorHandler = require('../middlewares/validation.handler')
const { userSchema, idUserSchema, userClientSchema } = require('../schemas/user.schema')
const { verifyTokenHandler, verifyRoleHandler, checkStatusUserHandler } = require('../middlewares/checkauth.handler')

router.get('/ping', userController.pong)
router.post('/register', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(userSchema), userController.registerUser)
router.put('/update/:idUsuario', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(idUserSchema, 'params'), validatorHandler(userSchema), userController.updateUser)
router.post('/registercustomer', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(userClientSchema), userController.registerCustomer)

module.exports = router