/**
 * ES: Middlewares para la verificación de autenticación
 * ENG: Middlewares for authentication verification
 */

const { verifyToken } = require('../utils/jwt.util')

const verifyTokenHandler = async (req, res, next) => {
    try {
      console.log("valiando token")
      const token = req.headers.authorization
      if (!token) {
        const _error = { statusCode: 401, message: 'No se ha encontrado token de seguridad', error: 'Unauthorized' }
        next(_error)
      }
      const user = verifyToken(token.split(' ')[1])
      req.payload = user
      next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        error.message = 'Sesión expirada, por favor inicie sesión nuevamente'
      }else if (error.name === 'JsonWebTokenError') {
        error.message = 'Token invalido, por favor inicie sesión nuevamente'
      }
      const _error = { statusCode: 401, message: error.message, error: error.name }
      next(_error)
    }
}

const verifyRoleHandler = (...roles) => {
    return (req, res, next) => {
      try {
        const { rol } = req.payload
        if (!roles.includes(rol)) {
          const _error = { statusCode: 403, message: 'No tiene permisos para realizar esta acción', error: 'Forbidden' }
          next(_error)
        }
        next()
      } catch (error) {
        const _error = { statusCode: 401, message: error.message, error: error.name }
        next(_error)
      }
    }
}

const checkStatusUserHandler = async (req, res, next) => {
    try {
      // verificar si el usuario esta en redis:
      const { estado } = req.payload
      if (estado === 'Deshabilitado' || estado === 'Inactivo') {
        const _error = { statusCode: 403, message: 'Usuario deshabilitado, no puede realizar acciones', error: 'Forbidden' }
        next(_error)
      } else {
        next()
      }
    } catch (error) {
      const _error = { statusCode: 500, message: 'Error al verificar el estado del usuario', error: error.name }
      next(_error)
    }
}

module.exports = {
    verifyTokenHandler,
    verifyRoleHandler,
    checkStatusUserHandler
}