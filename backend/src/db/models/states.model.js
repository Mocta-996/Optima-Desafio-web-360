const { DataTypes, Model } = require('sequelize')
const sequelize = require('../connection')

/**
 * ES: Modelo de la entidad de estados
 * ENG: Model of the states entity
 * @property {number} idestados
 * @property {string} nombre
 */

class StateModel extends Model { }

StateModel.init({
    idestados: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'estados',
    modelName: 'estados',
    timestamps: false
})

module.exports = StateModel