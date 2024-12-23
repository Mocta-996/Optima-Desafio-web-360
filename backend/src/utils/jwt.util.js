/**
 *  Para firmar , verificar y elminar tokens de autenticacion de usuario, tanto para oauth normal, como para oauth con google
 */
const jwt = require('jsonwebtoken')
const { config } = require('../config/config')

// firmar token
const signToken = (user) => {
  const payload = {
    idUsuario: user.idUsuario,
    rol: user.rol,
    estado: user.estado,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 1 dia
    //exp: Math.floor(Date.now() / 1000) + (60*5) // 1 minuto
  }
  const token = jwt.sign(payload, config.jwt_secret)
  return ({ rol: user.rol, token })
}

// verificar token
const verifyToken = (token) => {
  return jwt.verify(token, config.jwt_secret)
}

module.exports = {
  signToken, verifyToken
}
