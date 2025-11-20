require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./src/middleware/cors');
const { swaggerUi, swaggerSpec } = require('./src/config/swagger');



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(corsMiddleware);

//swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Hello World!');
});





app.listen(port, () => {
  console.log(`Servicio escuchando por http://localhost:${port}`);
});