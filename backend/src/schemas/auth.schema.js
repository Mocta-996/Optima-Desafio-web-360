/**
 * ES: Esquema de la entidad auth
 * ENG: Schema of the auth entity
 */

const zod = require('zod')

const authSchema = zod.object({
    correo_electronico: zod.string({
        message: 'El campo correo_electronico debe ser un correo electrónico'
    }).email({
        message: 'El campo correo_electronico debe ser un correo electrónico'
    }),
    contrasenia: zod.string({
        required_error: 'El campo contrasena es requerido'
    })
})


module.exports = {
    authSchema
}