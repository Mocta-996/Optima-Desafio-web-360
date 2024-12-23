/**
 * ES: Rutas para la entidad de roles
 * ENG: Routes for the roles entity
 */

const express = require('express')
const router = express.Router()
const rolController = require('../controllers/role.controller')
const validatorHandler = require('../middlewares/validation.handler')
const { roleSchema, idRoleSchema } = require('../schemas/role.schema')
const { verifyTokenHandler, verifyRoleHandler, checkStatusUserHandler } = require('../middlewares/checkauth.handler')

router.get('/ping', rolController.pong)
router.post('/register', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador'), validatorHandler( roleSchema, 'body'), rolController.registerRole)
router.put('/update/:idrol', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador'), validatorHandler( idRoleSchema, 'params'), validatorHandler( roleSchema, 'body'), rolController.updateRole)
router.get('/get', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), rolController.getRoles)

module.exports = router