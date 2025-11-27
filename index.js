require('dotenv').config();
const express = require('express');
const {connectDB} = require('./src/config/database');
const {syncDatabase} = require('./src/models');
const corsMiddleware = require('./src/middleware/cors');
const productRoutes = require('./src/routes/productRoutes');
const { swaggerUi, swaggerSpec } = require('./src/config/swagger');



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(corsMiddleware);

//swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Connect to the database and sync models
connectDB().then(() => {
  syncDatabase();
});

// Start the server

app.listen(port, () => {
  console.log(`Servicio escuchando por http://localhost:${port}`);
});