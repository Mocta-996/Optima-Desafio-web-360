/**
 * ES: Configuración de la base de datos
 * ENG: Database configuration
 */

const { Sequelize } = require('sequelize')
const configdb = require('./config')
const { host, user, password, database } = configdb.database

const sequelize = new Sequelize(database, user, password,
    {
  dialect: 'mssql',
  host: host,
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa con SQL Server.');
  })
  .catch((error) => {
    console.error('Error al conectar con SQL Server:', error);
});

module.exports = sequelize


