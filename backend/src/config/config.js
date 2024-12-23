require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT,
    clientProd: process.env.CLIENT_PROD,
    clientDev: process.env.CLIENT_DEV,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    jwt_secret: process.env.JWT_SECRET,
}

module.exports = { config }