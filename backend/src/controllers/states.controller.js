/**
 * ES: Controlador para la entidad de estados
 * ENG: Controller for the states entity
 */

const sequelize = require('../db/connection')

// prueba de funcionamiento del controlador
const pong = async (req, res) => {
  res.send({ satusCode: 200, message: 'pong from states.controller' })
}

// registrar nuevo estado
const registerState = async (req, res, next) => {
  try {
    const { nombre } = req.body
    await sequelize.query('EXEC insertar_estados @nombre = :nombre', {
            replacements: { nombre }
        }
    )
    res.status(201).json({ statusCode: 201, message: 'Estado registrado' })
  } catch (error) {
    next({ statusCode: 400, error: 'Excepción', message: error.message })
  }
}

// modificar estado
const updateState = async (req, res, next) => {
  try {
    const { nombre } = req.body
    const { idestados } = req.params
    await sequelize.query('EXEC modificar_estados @idestados = :idestados, @nombre = :nombre', {
            replacements: { idestados, nombre }
        }
    )
    res.status(201).json({ statusCode: 201, message: 'Estado modificado' })
  } catch (error) {
    next({ statusCode: 400, error: 'Excepción', message: error.message })
  }
}

//obtener todos los estados
const getStates = async (req, res, next) => {
  try {
    const states = await sequelize.query('SELECT * FROM dbo.estados',
        { type: sequelize.QueryTypes.SELECT }
    )
    res.status(200).json({ statusCode: 200, data: states })
  } catch (error) {
    next({ statusCode: 400, error: 'Excepción', message: error.message })
  }
}

module.exports = {
    pong,
    registerState,
    updateState,
    getStates
}
