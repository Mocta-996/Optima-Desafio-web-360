/**
 * ES: Esquema de la entidad Categoría de Producto
 * EN: Product Category entity schema
 */

const zod = require('zod')


const productCategorySchema = zod.object({
    estados_idestados: zod.number({
        message: 'El campo estado debe ser un número'
    }).int({
        message: 'El campo estado debe ser un número entero'
    }),
    nombre: zod.string({
        required_error: 'El campo nombre es requerido'
    }).min(1,{
        message: 'El campo nombre debe contener al menos un caracter'
    }).max(45, {
        message: 'El campo nombre debe contener como máximo 45 caracteres'
    })
})

const idProductCategorySchema = zod.object({
    idCategoriaProducto: zod.string()
    .transform((value) => {
        const num = Number(value);
        if (isNaN(num)) {
          throw new Error('El idestados debe ser un número');
        }
        return num;
      }),
})

module.exports = {
    productCategorySchema,
    idProductCategorySchema
}