/**
 * ES: Rutas para la entidad de estados
 * ENG: Routes for the states entity
 */

const express = require('express')
const router = express.Router()
const stateController = require('../controllers/states.controller')
const validatorHandler = require('../middlewares/validation.handler')
const { stateSchema, idStateSchema } = require('../schemas/states.schema')
const { verifyTokenHandler, verifyRoleHandler, checkStatusUserHandler } = require('../middlewares/checkauth.handler')

router.get('/ping', stateController.pong)
router.post('/register', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador'), validatorHandler(stateSchema, 'body'), stateController.registerState)
router.put('/update/:idestados', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador'), validatorHandler(idStateSchema, 'params'), validatorHandler(stateSchema, 'body'), stateController.updateState)
router.get('/get', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), stateController.getStates)

module.exports = router