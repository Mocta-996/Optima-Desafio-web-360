/**
 * ES: Controlador de pedidos
 * EN: Order controller
 */

const sequelize = require('../db/connection')

// prueba de funcionamiento del controlador
const pong = async (req, res) => {
    res.send({ satusCode: 200, message: 'pong from order.controller' })
}

// registro de orden
const registerOrder = async (req, res) => {
    try {
        const { nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, ordenDetalles } = req.body
        const { idUsuario } = req.payload
        const idestados = 1
        const json_detalle_orden = JSON.stringify(ordenDetalles)
        await sequelize.query('EXEC insertar_orden @usuario_idusuario = :usuario_idusuario, @estados_idestados = :estados_idestados, @nombre_completo = :nombre_completo, @direccion = :direccion, @telefono = :telefono, @correo_electronico = :correo_electronico, @fecha_entrega = :fecha_entrega, @json_detalle_orden = :json_detalle_orden', {
            replacements: { usuario_idusuario: idUsuario, estados_idestados: idestados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, json_detalle_orden }
        })
        res.status(201).send({ statusCode: 201, message: 'Orden registrada correctamente' })
    } catch (error) {
        res.status(400).send({ statusCode: 400, message: error.message , error: error.name })
    }
}

// actualizar estado de orden
const updateOrderStatus = async (req, res) => {
    try {
        const { estados_idestados } = req.body
        const { idOrden } = req.params
        await sequelize.query('EXEC modificar_orden @estados_idestados = :estados_idestados, @idOrden = :idOrden', {
            replacements: { estados_idestados, idOrden }
        })
        res.status(200).send({ statusCode: 200, message: 'Estado de orden actualizado correctamente' })
    } catch (error) {
        res.status(400).send({ statusCode: 400, message: error.message, error: error.name })
    }
}


// obtener ordenes
const getOrders = async (req, res) => {
    try {
        const orders = await sequelize.query('SELECT * FROM  vw_ordenes', { type: sequelize.QueryTypes.SELECT })
        const groupedOrders = orders.reduce((acc, order) => {
            if (!acc[order.idOrden]) {
                acc[order.idOrden] = {
                    idOrden: order.idOrden,
                    fecha_creacion: order.fecha_creacion,
                    nombre_completo: order.nombre_completo,
                    direccion: order.direccion,
                    telefono: order.telefono,
                    correo_electronico: order.correo_electronico,
                    fecha_entrega: order.fecha_entrega,
                    total_orden: order.total_orden,
                    estado: order.estado,
                    detalles: [] 
                };
            }
            acc[order.idOrden].detalles.push({
                idOrdenDetalles: order.idOrdenDetalles,
                cantidad: order.cantidad,
                precio: order.precio,
                subtotal: order.subtotal,
                idProducto: order.idProducto,
                nombre_producto: order.nombre_producto,
                marca_producto: order.marca_producto,
                categoria_producto: order.categoria_producto
            });
            return acc;
        }, {});

        const ordersGroupedArray = Object.values(groupedOrders);

        res.status(200).send({ statusCode: 200, data: ordersGroupedArray })
    } catch (error) {
        res.status(400).send({ statusCode: 400, message: error.message, error: error.name })
    }
}


module.exports = {
    pong,
    registerOrder,
    updateOrderStatus,
    getOrders
}