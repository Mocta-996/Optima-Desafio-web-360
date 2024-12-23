/**
 * ES: Utilidad para subir archivos
 * EN: Utility to upload files
 */

const path = require('path')
const fs = require('fs')

// Configuración del almacenamiento
const fileUpload = async (req, res, next) => {
    try {
        // Verificar si se cargó un archivo
        if (!req.files || !req.files.foto) {
            return res.status(400).json({ statusCode: 400, error: 'Archivo no encontrado', message: 'No se ha cargado ningún archivo.' })
        }

        // Acceder al archivo
        const foto = req.files.foto

        // Validar tipo de archivo
        const allowedExtensions = /png|jpeg|jpg|gif/
        const extension = path.extname(foto.name).toLowerCase()
        if (!allowedExtensions.test(extension)) {
            return res.status(400).json({ statusCode: 400, error: 'Formato de archivo no permitido', message: 'Formato de archivo no permitido.' })
        }

        // Crear una carpeta de destino si no existe
        const uploadPath = path.join(__dirname, '../../uploads')
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }

        // Generar un nombre único para el archivo
        const fileName = `foto_${Date.now()}${extension}`

        // Mover el archivo a la carpeta de destino
        const filePath = path.join(uploadPath, fileName)
        await foto.mv(filePath)

        // pasar el path al siguiente middleware
        req.filePath = filePath
        next()
        
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.name , message: error.message })
    }
}

module.exports = fileUpload