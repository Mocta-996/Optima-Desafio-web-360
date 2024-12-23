/**
 * ES: Rutas para la entidad de categorías de productos
 * EN: Routes for the product categories entity
 */

const express = require('express')
const router = express.Router()
const productCategoryController = require('../controllers/productCategory.controller')
const validatorHandler = require('../middlewares/validation.handler')
const { productCategorySchema, idProductCategorySchema } = require('../schemas/productCategory.schema')
const { verifyTokenHandler, verifyRoleHandler, checkStatusUserHandler } = require('../middlewares/checkauth.handler')

router.get('/ping', productCategoryController.pong)
router.post('/register', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(productCategorySchema), productCategoryController.createProductCategory)
router.put('/update/:idCategoriaProducto', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador'), validatorHandler(idProductCategorySchema, 'params'), validatorHandler(productCategorySchema), productCategoryController.updateProductCategory)
router.get('/get', verifyTokenHandler, checkStatusUserHandler, verifyRoleHandler('Administrador', 'Operador', 'Cliente'), productCategoryController.getAllProductCategories)

module.exports = router