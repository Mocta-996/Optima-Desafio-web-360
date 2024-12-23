/**
 * ES: Configuración de la base de datos
 * ENG: Database configuration
 */

const { config } = require('../config/config')

module.exports = {
  database: {
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name
  }

}