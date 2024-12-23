/**
 * ES: Rutas para la entidad de productos
 * EN: Routes for the products entity
 */

const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const validatorHandler = require('../middlewares/validation.handler')
const { productSchema, fotoSchema, idProductoSchema } = require('../schemas/product.schema')
const { verifyTokenHandler, verifyRoleHandler, checkStatusUserHandler } = require('../middlewares/checkauth.handler')
const fileUpload = require('../middlewares/fileupload.handler')

router.get('/ping', productController.pong)
router.post('/register', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(productSchema), validatorHandler(fotoSchema, 'files'), fileUpload, productController.createProduct)
router.put('/update/:idProducto', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(idProductoSchema, 'params'), validatorHandler(productSchema), productController.updateProduct)
router.put('/update-photo/:idProducto', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(idProductoSchema, 'params'), validatorHandler(fotoSchema, 'files'), fileUpload, productController.updatePhotoProduct)
router.get('/get', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador', 'Cliente'), productController.getProducts)
module.exports = router