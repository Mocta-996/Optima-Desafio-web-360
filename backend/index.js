/**
 * ES: Archivo inicial, con las configuraciones del servidor
 * ENG: Initial file, with the server configurations
 */

const express = require('express')
const cors = require('cors')
const http = require('http')
const routerApi = require('./src/routes')
const { config } = require('./src/config/config')
const { errorHandler } = require('./src/middlewares/error.handler')
const fileUpload = require('express-fileupload')

const port = config.port || 5000
const app = express()
const server = http.createServer(app)
const whitelist = [config.clientProd, config.clientDev] // dominios permitidos
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
// swagger
//app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// body parser
app.use(fileUpload())
app.use(express.json())
app.use(cors(corsOptions))

// middleware y rutas
routerApi(app)
app.use(errorHandler)


// server
server.listen(port, () => {
  console.log(`Mi port ${port}`)
})
