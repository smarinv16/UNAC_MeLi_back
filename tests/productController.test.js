const request = require('supertest');
const express = require('express');

//mock de sequelize
const mockOp = {
    like: 'LIKE'
};

jest.mock('sequelize', () => ({
    Op: mockOp,
    DataTypes: {
        STRING: 'STRING',
        DECIMAL: () => 'DECIMAL',
        INTEGER: 'INTEGER',
        TEXT: 'TEXT'
    },
    Sequelize: {
        define: jest.fn().mockReturnValue({
            findAll: jest.fn(),
            findByPk: jest.fn(),
            create: jest.fn(),
        }),
    },
}));

// Mock del modelo Product
const mockProduct = {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
};

jest.mock('../src/models', () => ({
    Product: mockProduct,   
}));

const productController = require('../src/controllers/ProductController');

const app = express();
app.use(express.json());

//Rutas de prueba
app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.createProduct);
app.delete('/api/products/:id', productController.deleteProduct);
app.put('/api/products/:id', productController.updateProduct);
app.delete('/api/products', productController.deleteAllProducts);
app.get('/api/products/name/:name', productController.getProductsByName);

describe('Product Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllProducts', () => {
        it('deberia obtener todos losproductos exitosamente', async () => {
            const mockProducts = [
                { id: 1, name: 'Producto 1', price: 10.99, description: 'Descripción del producto 1' },
                { id: 2, name: 'Producto 2', price: 19.99, description: 'Descripción del producto 2' },
            ];
            mockProduct.findAll.mockResolvedValue(mockProducts);

            const res = await request(app).get('/api/products');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockProducts);
            expect(mockProduct.findAll).toHaveBeenCalledTimes(1);
        });

        it('deberia manejar errores al obtener los productos', async () => {
            mockProduct.findAll.mockRejectedValue(new Error('Error en base de datos'));

            const res = await request(app).get('/api/products');

            expect(res.status).toBe(500);
            expect(res.body.message).toContain('Error al getAllProducts');
        });
    });
});
    
