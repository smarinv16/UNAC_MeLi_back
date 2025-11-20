const cors = require('cors');

const corsOptions = {
  origin: '*', // Reemplaza con el origen permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

module.exports = cors(corsOptions);