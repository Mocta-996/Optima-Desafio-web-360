/**
 * ES: Controlador de la entidad Cliente
 * ENG: Controller for the Customer entity
 */

const sequelize = require('../db/connection')

// prueba de funcionamiento del controlador
const pong = async (req, res) => {
    res.send({ satusCode: 200, message: 'pong from customer.controller' })
}

// registrar nuevo cliente
const registerCustomer = async (req, res, next) => {
    try {
        const { razon_social, nombre_comercial, direccion_entrega } = req.body
        const result = await sequelize.query('DECLARE @idCliente INT; EXEC insertar_cliente @razon_social = :razon_social, @nombre_comercial = :nombre_comercial, @direccion_entrega = :direccion_entrega, @idCliente=@idCliente OUT;SELECT @idCliente AS idCliente;',{
                replacements: { razon_social, nombre_comercial, direccion_entrega }
            }
        )
        res.status(201).json({ statusCode: 201, message: result })
    } catch (error) {
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}

// modificar cliente
const updateCustomer = async (req, res, next) => {
    try {
        const { razon_social, nombre_comercial, direccion_entrega } = req.body
        const { idCliente } = req.params
        await sequelize.query('EXEC modificar_cliente @idCliente = :idCliente, @razon_social = :razon_social, @nombre_comercial = :nombre_comercial, @direccion_entrega = :direccion_entrega',{
                replacements: { idCliente, razon_social, nombre_comercial, direccion_entrega }
            }
        )
        res.status(201).json({ statusCode: 201, message: 'Cliente modificado correctamente' })
    } catch (error) {
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}

// obtener clientes
const getCustomers = async (req, res, next) => {
    try {
        const customers = await sequelize.query('SELECT * FROM dbo.cliente',
            { type: sequelize.QueryTypes.SELECT }
        )
        res.status(200).json({ statusCode: 200, customers: customers })
    } catch (error) {
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}


module.exports = {
    pong,
    registerCustomer,
    updateCustomer,
    getCustomers
}