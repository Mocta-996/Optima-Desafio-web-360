/**
 * ES: Esquema de usuario
 * EN: User schema
 */

const { customerSchema } = require('./customer.schema')

const zod = require('zod')

const userSchema = zod.object({
    rol_idrol: zod.number({
        message: 'El campo id rol es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo id rol debe ser un número entero'
    }).positive({
        message: 'El campo id rol debe ser un número positivo'
    }),
    estados_idestados: zod.number({
        message: 'El campo id estados es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo id estados debe ser un número entero'
    }).positive({
        message: 'El campo id estados debe ser un número positivo'
    }),
    correo_electronico: zod.string({
        message: 'El campo email es requerido'
    }).min(1,{
        message: 'El campo email debe contener al menos un caracter'
    }).max(80, {
        message: 'El campo email debe contener como máximo 50 caracteres'
    }).email({ 
        message: "El email no es válido" 
    }),
    nombre_completo: zod.string({
        message: 'El campo nombre completo es requerido'
    }).min(1,{
        message: 'El campo nombre completo debe contener al menos un caracter'
    }).max(50, {
        message: 'El campo nombre completo debe contener como máximo 50 caracteres'
    }),
    contrasenia: zod.string({
        message: 'El campo contraseña es requerido'
    }).min(1,{
        message: 'El campo contraseña debe contener al menos un caracter'
    }).max(64, {
        message: 'El campo contraseña debe contener como máximo 45 caracteres'
    }),
    telefono: zod.string({
        message: 'El campo telefono es requerido'
    }).min(1,{
        message: 'El campo telefono debe contener al menos un caracter'
    }).max(8, {
        message: 'El campo telefono debe contener como máximo 8 caracteres'
    }).regex(/^\d{8}$/, {
        message: 'El teléfono debe contener solo números y tener exactamente 8 dígitos',
    }),
    fecha_nacimiento: zod.string().date({
        message: 'El campo fecha de nacimiento debe ser una fecha'
    }),
})

const userUpdateSchema = zod.object({
    rol_idrol: zod.number({
        message: 'El campo id rol es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo id rol debe ser un número entero'
    }).positive({
        message: 'El campo id rol debe ser un número positivo'
    }),
    estados_idestados: zod.number({
        message: 'El campo id estados es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo id estados debe ser un número entero'
    }).positive({
        message: 'El campo id estados debe ser un número positivo'
    }),
    correo_electronico: zod.string({
        message: 'El campo email es requerido'
    }).min(1,{
        message: 'El campo email debe contener al menos un caracter'
    }).max(80, {
        message: 'El campo email debe contener como máximo 50 caracteres'
    }).email({ 
        message: "El email no es válido" 
    }),
    nombre_completo: zod.string({
        message: 'El campo nombre completo es requerido'
    }).min(1,{
        message: 'El campo nombre completo debe contener al menos un caracter'
    }).max(50, {
        message: 'El campo nombre completo debe contener como máximo 50 caracteres'
    }),
    telefono: zod.string({
        message: 'El campo telefono es requerido'
    }).min(1,{
        message: 'El campo telefono debe contener al menos un caracter'
    }).max(8, {
        message: 'El campo telefono debe contener como máximo 8 caracteres'
    }).regex(/^\d{8}$/, {
        message: 'El teléfono debe contener solo números y tener exactamente 8 dígitos',
    }),
    fecha_nacimiento: zod.string().date({
        message: 'El campo fecha de nacimiento debe ser una fecha'
    }),

})

const userClientSchema = zod.object({
    customer: customerSchema,
    rol_idrol: zod.number({
        message: 'El campo id rol es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo id rol debe ser un número entero'
    }).positive({
        message: 'El campo id rol debe ser un número positivo'
    }),
    estados_idestados: zod.number({
        message: 'El campo id estados es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo id estados debe ser un número entero'
    }).positive({
        message: 'El campo id estados debe ser un número positivo'
    }),
    correo_electronico: zod.string({
        message: 'El campo email es requerido'
    }).min(1,{
        message: 'El campo email debe contener al menos un caracter'
    }).max(80, {
        message: 'El campo email debe contener como máximo 50 caracteres'
    }).email({ 
        message: "El email no es válido" 
    }),
    nombre_completo: zod.string({
        message: 'El campo nombre completo es requerido'
    }).min(1,{
        message: 'El campo nombre completo debe contener al menos un caracter'
    }).max(50, {
        message: 'El campo nombre completo debe contener como máximo 50 caracteres'
    }),
    contrasenia: zod.string({
        message: 'El campo contraseña es requerido'
    }).min(1,{
        message: 'El campo contraseña debe contener al menos un caracter'
    }).max(64, {
        message: 'El campo contraseña debe contener como máximo 45 caracteres'
    }),
    telefono: zod.string({
        message: 'El campo telefono es requerido'
    }).min(1,{
        message: 'El campo telefono debe contener al menos un caracter'
    }).max(8, {
        message: 'El campo telefono debe contener como máximo 8 caracteres'
    }).regex(/^\d{8}$/, {
        message: 'El teléfono debe contener solo números y tener exactamente 8 dígitos',
    }),
    fecha_nacimiento: zod.string().date({
        message: 'El campo fecha de nacimiento debe ser una fecha'
    }),
})


const idUserSchema = zod.object({
    idUsuario: zod.number()
    .transform((value) => {
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error('El idUsuario debe ser un número');
      }
      return num;
    }),
})

module.exports = {
    userSchema,
    idUserSchema,
    userUpdateSchema,
    userClientSchema
}