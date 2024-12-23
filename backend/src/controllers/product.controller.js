/**
 * ES: Controlador de productos
 * EN: Product controller
 */

const sequelize = require('../db/connection')

// prueba de funcionamiento del controlador
const pong = async (req, res) => {
    res.send({ satusCode: 200, message: 'pong from product.controller' })
}

// registrar un nuevo producto
const createProduct = async (req, res, next) => {
 
    try {
        // se recibe por form data
        const { categoriaProducto_idCategoriaProducto, estados_idestados, nombre, marca, codigo, stock, precio } = req.body
        const fotoPath = req.filePath
        const { idUsuario } = req.payload
        await sequelize.query('EXEC insertar_producto @categoriaProducto_idCategoriaProducto = :categoriaProducto_idCategoriaProducto, @usuario_idusuario = :usuario_idusuario, @estados_idestados = :estados_idestados, @nombre = :nombre, @marca = :marca, @codigo = :codigo, @stock = :stock, @precio = :precio, @foto = :foto', {
            replacements: { categoriaProducto_idCategoriaProducto, usuario_idusuario: idUsuario, estados_idestados, nombre, marca, codigo, stock, precio, foto:fotoPath }
        })
        res.send({ statusCode: 201, message: 'Producto registrado' })
    } catch (error) {
        console.error('createProduct', error)
        res.send({ statusCode: 400, message: 'Error al registrar el producto', error: error.message })
    }
}

// actualizar un producto
const updateProduct = async (req, res, next) => {
    try {
        const { categoriaProducto_idCategoriaProducto, estados_idestados, nombre, marca, codigo, stock, precio } = req.body
        const { idProducto } = req.params

        await sequelize.query('EXEC modificar_producto @idProducto = :idProducto, @categoriaProducto_idCategoriaProducto = :categoriaProducto_idCategoriaProducto, @estados_idestados = :estados_idestados, @nombre = :nombre, @marca = :marca, @codigo = :codigo, @stock = :stock, @precio = :precio', {
            replacements: { idProducto, categoriaProducto_idCategoriaProducto, estados_idestados, nombre, marca, codigo, stock, precio }
        })
        res.send({ statusCode: 201, message: 'Producto actualizado' })
    } catch (error) {
        console.error('updateProduct', error)
        res.send({ statusCode: 400, message: 'Error al actualizar el producto', error: error.message })
    }
}

// actualizar foto de un producto
const updatePhotoProduct = async (req, res, next) => {
    try {
        const  fotoPath = req.filePath
        const { idProducto } = req.params

        await sequelize.query('EXEC modificar_foto_producto @idProducto = :idProducto, @foto = :foto', {
            replacements: { idProducto, foto: fotoPath }
        })
        res.send({ statusCode: 201, message: 'Foto actualizada' })
    } catch (error) {
        console.error('updateFotoProduct', error)
        res.send({ statusCode: 400, message: 'Error al actualizar la foto', error: error.message })
    }
}

// obtener todos los productos
const getProducts = async (req, res, next) => {
    try {
        const products = await sequelize.query('select * from producto;')
        res.send({ statusCode: 200, message: 'Productos obtenidos', data: products })
    } catch (error) {
        console.error('getProducts', error)
        res.send({ statusCode: 400, message: 'Error al obtener los productos', error: error.message })
    }
}

module.exports = {
    pong,
    createProduct,
    updateProduct,
    updatePhotoProduct,
    getProducts
}