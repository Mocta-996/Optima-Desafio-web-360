/**
 * ES: Middlewares para el manejo de errores
 * ENG: Middlewares for error handling
 */

/**
 * Middlewares para el manejo de errores
 * errores:
 * !400 Error al interpretar la solicitud
 * !401 No autenticado
 * !403 No autorizado
 * !500 Error interno del servidor
 *  */

// Permite enviar el error al cliente
function errorHandler (err, req, res, next) {
    if (err.error === 'SequelizeDatabaseError') {
        err.error = 'Database Error'
    }
    // errores validados
    if (err.statusCode) {
        res.status(err.statusCode).json({
        statusCode: err.statusCode,
        error: err.error,
        message: err.message
        })
    } else { // errores no validados
        res.status(500).json({
        statusCode: 500,
        error: 'Internal Server Error',
        message: err.message
        })
    }
}
  
module.exports = {
    errorHandler
}
  