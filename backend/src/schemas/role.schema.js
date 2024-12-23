/**
 * ES: Esquema de la entidad rol
 * ENG: Schema of the role entity
 */

const zod = require('zod')

const roleSchema = zod.object({
    nombre: zod.string({
        required_error: 'El campo nombre es requerido'
    }).min(1,{
        message: 'El campo nombre debe contener al menos un caracter'
    }).max(45, {
        message: 'El campo nombre debe contener como máximo 45 caracteres'
    })
})

const idRoleSchema = zod.object({
    idrol: zod.string()
    .transform((value) => {
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error('El idestados debe ser un número');
      }
      return num;
    }),
})

module.exports = {
    roleSchema,
    idRoleSchema
}