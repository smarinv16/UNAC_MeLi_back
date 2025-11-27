const express = require('express');
const productController = require('../controllers/ProductController');

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

router.get('/', productController.getAllProducts);

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

router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/name/{name}:
 *   get:
 *     summary: Obtener un producto por nombre
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */


router.get('/name/:name', productController.getProductByName);

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

router.post('/', productController.createProduct);

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

router.put('/:id', productController.updateProduct);

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

router.delete('/:id', productController.deleteProduct);
// Define your product routes here

module.exports = router;