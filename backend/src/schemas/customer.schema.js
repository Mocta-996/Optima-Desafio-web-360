/**
 * ES: Esquema de la entidad cliente
 * ENG: Schema of the customer entity
 */

const zod = require('zod')

const customerSchema = zod.object({
    razon_social: zod.string({
        required_error: 'El campo razon_social es requerido'
    }).min(1,{
        message: 'El campo razon_social debe contener al menos un caracter'
    }).max(245, {
        message: 'El campo razon_social debe contener como máximo 245 caracteres'
    }),
    nombre_comercial: zod.string({
        required_error: 'El campo nombre_comercial es requerido'
    }).min(1,{
        message: 'El campo nombre_comercial debe contener al menos un caracter'
    }).max(345, {
        message: 'El campo nombre_comercial debe contener como máximo 345 caracteres'
    }),
    direccion_entrega: zod.string({
        required_error: 'El campo direccion_entrega es requerido'
    }).min(1,{
        message: 'El campo direccion_entrega debe contener al menos un caracter'
    }).max(345, {
        message: 'El campo direccion_entrega debe contener como máximo 345 caracteres'
    })
})

const idCustomerSchema = zod.object({
    idCliente: zod.string()
    .transform((value) => {
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error('El idCliente debe ser un número');
      }
      return num;
    }),
})

module.exports = {
    customerSchema,
    idCustomerSchema
}