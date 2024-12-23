/**
 * ES: Esquema de la entidad producto
 * ENG: Schema of the product entity
 */

const zod = require('zod')

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const productSchema = zod.object({
    categoriaProducto_idCategoriaProducto: zod.string({
        message: 'El campo categoria es requerido'
    }).transform((value) => {
        const num = Number(value);
        if (isNaN(num)) {
          throw new Error('El idestados debe ser un número');
        }
        return num;
    }),
    estados_idestados: zod.string({
        message: 'El campo estado es requerido'
    }).transform((value) => {
        const num = Number(value);
        if (isNaN(num)) {
          throw new Error('El idestados debe ser un número');
        }
        return num;
    }),
    nombre: zod.string({
        required_error: 'El campo nombre es requerido'
    }).min(1,{
        message: 'El campo nombre debe contener al menos un caracter'
    }).max(45, {
        message: 'El campo nombre debe contener como máximo 45 caracteres'
    }),
    marca: zod.string({
        required_error: 'El campo marca es requerido'
    }).min(1,{
        message: 'El campo marca debe contener al menos un caracter'
    }).max(45, {
        message: 'El campo marca debe contener como máximo 45 caracteres'
    }),
    codigo: zod.string({
        required_error: 'El campo codigo es requerido'
    }).min(1,{
        message: 'El campo codigo debe contener al menos un caracter'
    }).max(45, {
        message: 'El campo codigo debe contener como máximo 45 caracteres'
    }),
    stock: zod.string({
        message: 'El campo stock es requerido'
    }).transform((value) => {
        const num = Number(value);
        if (isNaN(num)) {
          throw new Error('El stock debe ser un número');
        }
        return num;
    }),
    precio: zod.string({
        message: 'El campo precio es requerido'
    }).transform((value) => {
        const num = Number(value);
        if (isNaN(num)) {
          throw new Error('El precio debe ser un número');
        }
        return num;
    })
})

const fotoSchema = zod.object({
    foto: zod.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type || file?.mimetype),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
})

const idProductoSchema = zod.object({
    idProducto: zod.string({
        message: 'El campo id Producto es requerido'
    }).transform((value) => {
        const num = Number(value);
        if (isNaN(num)) {
          throw new Error('El id Producto debe ser un número');
        }
        return num;
    })
})

module.exports = {
    productSchema,
    fotoSchema,
    idProductoSchema
}