/**
 * ES: Rutas de autenticación
 * ENG: Authentication routes
 */

const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const validatorHandler = require('../middlewares/validation.handler')
const {  authSchema } = require('../schemas/auth.schema')

router.get('/ping', authController.pong)
router.post('/login', validatorHandler(authSchema), authController.login)

module.exports = router