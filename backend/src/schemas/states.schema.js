/**
 * ES: Esquema de la entidad de estados
 * ENG: Schema of the states entity
 */

const zod = require('zod')

const stateSchema = zod.object({
    nombre: zod.string({
        required_error: 'El campo nombre es requerido'
    }).min(1,{
        message: 'El campo nombre debe contener al menos un caracter'
    }).max(45, {
        message: 'El campo nombre debe contener como máximo 45 caracteres'
    })
})

const idStateSchema = zod.object({
    idestados: zod.string()
    .transform((value) => {
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error('El idestados debe ser un número');
      }
      return num;
    }),
})

module.exports = {
    stateSchema,
    idStateSchema
}