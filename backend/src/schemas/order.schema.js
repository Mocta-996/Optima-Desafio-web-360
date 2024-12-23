/**
 * ES: Esquema de pedidos
 * EN: Order schema
 */

const zod = require('zod')


/*
CREATE TABLE ordenDetalles (
    idOrdenDetalles INT IDENTITY(1,1) PRIMARY KEY,
    orden_idOrden INT NOT NULL,
    producto_idProducto INT NOT NULL,
    cantidad INT,
    precio FLOAT,
    subtotal FLOAT,
    FOREIGN KEY (orden_idOrden) REFERENCES orden (idOrden),
    FOREIGN KEY (producto_idProducto) REFERENCES producto (idProducto)
);
*/

const orderDetailsSchema = zod.object({
    producto_idProducto: zod.number({
        message: 'El campo id producto es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo id producto debe ser un número entero'
    }).positive({
        message: 'El campo id producto debe ser un número positivo'
    }),
    cantidad: zod.number({
        message: 'El campo cantidad es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo cantidad debe ser un número entero'
    }).positive({
        message: 'El campo cantidad debe ser un número positivo'
    }),
})

/**
CREATE TABLE orden (
    fecha_creacion DATETIME DEFAULT GETDATE(),
    nombre_completo VARCHAR(545),
    direccion VARCHAR(545),
    telefono VARCHAR(8),
    correo_electronico VARCHAR(45),
    fecha_entrega DATE,
    total_orden FLOAT,
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario (idusuario),
    FOREIGN KEY (estados_idestados) REFERENCES estados (idestados)
);

 */
const orderSchema = zod.object({
    nombre_completo: zod.string({
        message: 'El campo nombre completo es requerido'
    }).min(1,{
        message: 'El campo nombre completo debe contener al menos un caracter'
    }).max(545, {
        message: 'El campo nombre completo debe contener como máximo 545 caracteres'
    }),
    direccion: zod.string({
        message: 'El campo dirección es requerido'
    }).min(1,{
        message: 'El campo dirección debe contener al menos un caracter'
    }).max(545, {
        message: 'El campo dirección debe contener como máximo 545 caracteres'
    }),
    telefono: zod.string({
        message: 'El campo teléfono es requerido'
    }).min(1,{
        message: 'El campo teléfono debe contener al menos un caracter'
    }).max(8, {
        message: 'El campo teléfono debe contener como máximo 8 caracteres'
    }).regex(/^\d{8}$/, {
        message: 'El teléfono debe contener solo números y tener exactamente 8 dígitos',
    }),
    correo_electronico: zod.string({
        message: 'El campo correo electronico es requerido'
    }).min(1,{
        message: 'El campo correo electronico debe contener al menos un caracter'
    }).max(45, {
        message: 'El campo correo electronico debe contener como máximo 45 caracteres'
    }).email({ 
        message: "El correo electronico no es válido" 
    }),
    fecha_entrega: zod.string({
        message: 'El campo fecha de entrega es requerido'
    }).date({
        message: 'El campo fecha de entrega debe ser una fecha'
    }),
    ordenDetalles: zod.array(orderDetailsSchema).nonempty({
        message: 'Detalles de la orden es requerido'
    })
})

const updateOrderStatusSchema = zod.object({
    estados_idestados: zod.number({
        message: 'El campo id estado es requerido, debe ser un número entero y positivo'
    }).int({
        message: 'El campo id estado debe ser un número entero'
    }).positive({
        message: 'El campo id estado debe ser un número positivo'
    })
})

const idOrderSchema = zod.object({
    idOrden: zod.string({
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
    orderSchema,
    idOrderSchema,
    updateOrderStatusSchema
}