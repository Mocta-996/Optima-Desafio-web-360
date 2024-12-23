/**
 * ES: Controlador para el inicio de sesión
 * ENG: Controller for login
 */

const sequelize = require('../db/connection')
const { signToken } = require('../utils/jwt.util')
// prueba de funcionamiento del controlador
const pong = async (req, res) => {
    res.send({ satusCode: 200, message: 'pong from auth.controller' })
}

// autenticación de usuario
const login = async (req, res, next) => {
    try {
        const { correo_electronico, contrasenia } = req.body
        const result = await sequelize.query('EXEC autenticar_usuario @correo_electronico = :correo_electronico, @contrasenia = :contrasenia',{
                replacements: { correo_electronico, contrasenia }
            }
        )
        if (result[0].length === 0) {
            return next({ statusCode: 401, error: 'No autorizado', message: 'Correo electrónico o contraseña incorrectos' })
        } else {
            const user = result[0][0]
            const token =  signToken(user)
            res.status(200).json({ statusCode: 200, data: token })
        }
        // res.status(200).json({ statusCode: 200, message: result })
    } catch (error) {
        next({ statusCode: 400, error: 'Excepción', message: error.message })
    }
}



module.exports = {
    pong,
    login
}