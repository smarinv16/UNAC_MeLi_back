const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
        description: 'This is the API documentation for our service',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Rutas donde se encuentran los endpoints documentados
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = { swaggerUi,
  swaggerSpec,
};// Swagger setup
