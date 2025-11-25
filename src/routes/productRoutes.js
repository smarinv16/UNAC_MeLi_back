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

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'     
 *       404:
 *         description: Producto no encontrado
 */

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  if (productId < 0)
    return res.status(404).json({ message: 'Product not found' });
  res.json({ id: productId, name: `Product ${productId}` });
});

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Crear un nuevo producto
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *  responses:
 *    201:
 *      description: Producto creado exitosamente
 *      content:  
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 */

router.post('/', (req, res) => {
  const newProduct = req.body;
  res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *      summary: Actualizar un producto por ID
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: ID del producto
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      responses:
 *        200:
 *          description: Producto actualizado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product' 
 *        404:
 *          description: Producto no encontrado 
 */

router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  res.json({ id: productId, ...updatedProduct });
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *      summary: Eliminar un producto por ID
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: ID del producto
 *      responses:
 *        204:
 *          description: Producto eliminado exitosamente
 *        404:
 *          description: Producto no encontrado
 */

router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  res.status(204).send();
});
// Define your product routes here

module.exports = router;