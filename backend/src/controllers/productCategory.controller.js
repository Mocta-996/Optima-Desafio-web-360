/**
 * ES: Controlador para la entidad de categorías de productos
 * EN: Controller for the product categories entity
 */

const sequelize = require('../db/connection')

// prueba de funcionamiento del controlador
const pong = async (req, res) => {
    res.send({ satusCode: 200, message: 'pong from productCategory.controller' })
}

// registrar una nueva categoría de producto
const createProductCategory = async (req, res) => {
    const { estados_idestados, nombre } = req.body
    const { idUsuario } = req.payload
    try {
        await sequelize.query('EXEC insertar_categoria_producto @usuario_idusuario = :usuario_idusuario, @estados_idestados = :estados_idestados, @nombre = :nombre', {
            replacements: { usuario_idusuario: idUsuario, estados_idestados, nombre }
        })
        res.status(201).json({ statusCode: 201, message: 'Categoría de producto creada'})
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.name, error: error.message })
    }
}

// actualizar una categoría de producto
const updateProductCategory = async (req, res) => {
    const { idCategoriaProducto } = req.params
    const { estados_idestados, nombre } = req.body
    try {
        await sequelize.query('EXEC modificar_categoria_producto @idCategoriaProducto = :idCategoriaProducto, @estados_idestados = :estados_idestados, @nombre = :nombre', {
            replacements: { idCategoriaProducto, estados_idestados, nombre }
        })
        res.status(200).json({ statusCode: 200, message: 'Categoría de producto actualizada'})
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.name, error: error.message })
    }
}

// obtener todas las categorias de productos
const getAllProductCategories = async (req, res) => {
    try {
        const productCategories = await sequelize.query('SELECT * FROM categoriaProducto')
        res.status(200).json({ statusCode: 200, productCategories })
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.name, error: error.message })
    }
}

module.exports = {
    pong,
    createProductCategory,
    updateProductCategory,
    getAllProductCategories
}