const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:   
 *      Product:
 *          type: object
 *          required:
 *            - id
 *            - name 
 *            - description
 *            - price
 *            - category
 *            - stock
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Id unico del producto
 *              name:
 *                  type: string
 *                  description: Nombre del producto
 *              description:
 *                  type: string
 *                  description: Descripción del producto
 *              price:
 *                  type: number
 *                  format: float
 *                  description: Precio del producto
 *              category:
 *                  type: string
 *                  description: Categoría del producto
 *              stock:   
 *                  type: integer
 *                  description: Cantidad disponible en inventario
 *              image:
 *                  type: string
 *                  description: URL de la imagen del producto
 *          example:
 *              id: 1
 *              name: "wireless mouse"
 *              description: "A high-quality wireless mouse"
 *              price: 29.99
 *              category: "Electronics"  
 *              stock: 100
 *              image: "https://example.com/images/wireless-mouse.jpg"
 */


/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Obtener todos los productos
 *      tags: [Products]
 *      responses:
 *       200:
 *        description: Lista de productos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Product A' }, { id: 2, name: 'Product C' }]);
});

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  res.json({ id: productId, name: `Product ${productId}` });
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  res.json({ id: productId, ...updatedProduct });
});

router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  res.status(204).send();
});
// Define your product routes here

module.exports = router;