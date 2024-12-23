/**
 * ES: Middleware para la validación de los esquemas
 * ENG: Middleware for schema validation
 */

const validatorHandler = (schema, property = 'body') => {   
    return (req, res, next) => {
        try {
            console.log("validando")
            const data = req[property]
            console.log(data)
            const  result = schema.safeParse(data)
            if (!result.success) {
                const errorMessages = result.error.errors.map((error) => {
                    return error.message
                })
                next({ statusCode: 400, error: 'Parámetro requerido', message: errorMessages })
            } else {
                next()
            }   
        } catch (error) {
            const _error = {statusCode: 400, error: 'Excepción', message: error.message}
            next(_error)
        }
    }
}

module.exports = validatorHandler