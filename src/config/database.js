const {Sequelize} = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize (
    process.env.DB_NAME || process.env.MYSQL_DATABASE_UNAC || "meli_db",
    process.env.DB_USER || process.env.MYSQLUSER || "root",
    process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || "unac1234", 
    {
        host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
        dialect: 'mysql',
        port : process.env.DB_PORT || process.env.MYSQLPORT || 3306,
        logging : false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate(); 
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

module.exports = { sequelize, connectDB };