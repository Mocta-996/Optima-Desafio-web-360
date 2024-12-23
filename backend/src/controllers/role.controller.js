/**
 * ES: Controlador para la entidad rol
 * ENG: Controller for the role entity
 */

const sequelize = require('../db/connection')

// prueba de funcionamiento del controlador
const pong = async (req, res) => {
    res.send({ satusCode: 200, message: 'pong from rol.controller' })
}

// registrar nuevo rol
const registerRole = async (req, res, next) => {
    try {
        const { nombre } = req.body
        await sequelize.query('EXEC insertar_rol @nombre = :nombre', {
                replacements: { nombre }
            }
        )
        res.status(201).json({ statusCode: 201, message: 'Rol registrado' })
    } catch (error) {
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}

// modificar rol
const updateRole = async (req, res, next) => {
    try {
        const { nombre } = req.body
        const { idrol } = req.params
        await sequelize.query('EXEC modificar_rol @idrol = :idrol, @nombre = :nombre', {
                replacements: { idrol, nombre }
            }
        )
        res.status(201).json({ statusCode: 201, message: 'Rol modificado' })
    } catch (error) {
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}

//obtener todos los roles
const getRoles = async (req, res, next) => {
    try {
        const roles = await sequelize.query('SELECT * FROM dbo.rol',
            { type: sequelize.QueryTypes.SELECT }
        )
        res.status(200).json({ statusCode: 200, data: roles })
    } catch (error) {
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}

module.exports = {
    pong,
    registerRole,
    updateRole,
    getRoles
}