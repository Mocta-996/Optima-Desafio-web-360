/**
 * ES: Controlador para la entidad de usuarios
 * EN: User entity controller
 */

const sequelize = require('../db/connection')

// prueba de funcionamiento del controlador
const pong = async (req, res) => {
    res.send({ satusCode: 200, message: 'pong from user.controller' })
}

// registrar un nuevo usuario que no sea cliente
const registerUser = async (req, res, next) => {
    try {
        const { rol_idrol, estados_idestados, correo_electronico, nombre_completo, contrasenia, telefono, fecha_nacimiento } = req.body
        await sequelize.query('EXEC insertar_usuario @rol_idrol = :rol_idrol, @estados_idestados = :estados_idestados, @correo_electronico = :correo_electronico, @nombre_completo = :nombre_completo, @contrasenia = :contrasenia, @telefono = :telefono, @fecha_nacimiento = :fecha_nacimiento', {
            replacements: { rol_idrol, estados_idestados, correo_electronico, nombre_completo, contrasenia, telefono, fecha_nacimiento }
        })
        res.json({ statusCode: 200, message: 'Usuario registrado correctamente' })
    } catch (error) {
        console.log(error)
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}

// actualizar un usuario que no sea cliente
const updateUser = async (req, res, next) => {
    try {
        const { rol_idrol, estados_idestados, correo_electronico, nombre_completo, telefono, fecha_nacimiento } = req.body
        await sequelize.query('EXEC actualizar_usuario @rol_idrol = :rol_idrol, @estados_idestados = :estados_idestados, @correo_electronico = :correo_electronico, @nombre_completo = :nombre_completo, @telefono = :telefono, @fecha_nacimiento = :fecha_nacimiento', {
            replacements: { rol_idrol, estados_idestados, correo_electronico, nombre_completo, telefono, fecha_nacimiento }
        })
        res.json({ statusCode: 200, message: 'Usuario actualizado correctamente' })
    } catch (error) {
        console.log(error)
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}

// registrar un nuevo usuario cliente
const registerCustomer = async (req, res, next) => {
    try {
        const { rol_idrol, estados_idestados, correo_electronico, nombre_completo, contrasenia, telefono, fecha_nacimiento, customer } = req.body
        const customerJson = JSON.stringify(customer);
        await sequelize.query('EXEC registrar_usuario_cliente @rol_idrol = :rol_idrol, @estados_idestados = :estados_idestados, @correo_electronico = :correo_electronico, @nombre_completo = :nombre_completo, @contrasenia = :contrasenia, @telefono = :telefono, @fecha_nacimiento = :fecha_nacimiento, @customer = :customer', {
            replacements: { rol_idrol, estados_idestados, correo_electronico, nombre_completo, contrasenia, telefono, fecha_nacimiento, customer: customerJson }
        })
        res.json({ statusCode: 200, message: 'Cliente registrado correctamente' })
    } catch (error) {
        console.log("registrar customer", error)
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}

module.exports = {
    pong,
    registerUser,
    updateUser,
    registerCustomer
}