const Product = require('../models/Product');

const productController = {
    // Create a new product
    createProduct: async (req, res) => {
        try {
            const{name, description, price, category, stock, imageUrl} = req.body;
            const newProduct = await Product.create({
                name, 
                description, 
                price, 
                category, 
                stock, 
                imageUrl
            });
            res.status(201).json({
                message: 'Product created successfully',
                data: newProduct
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Error creating product' });
        }
    },
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error GetAll products' });
        }
    },  
    // Get a product by ID
    getProductById: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                res.status(404).json({ error: 'Product not found' });
            }
            else {
                res.status(200).json(product);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching product' });
        }
    },
    // Update a product by ID
    updateProduct: async (req, res) => {
        try {
            const {id} = req.params;
            const {name, description, price, category, stock, imageUrl} = req.body;
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            await product.update({
                name,
                description,
                price,
                category,
                stock,
                imageUrl
            });
            res.status(200).json({
                message: 'Product updated successfully',
                data: product
            });
        } catch (error) {
            res.status(500).json({ error: 'Error updating product' });
        }
    },
    // Delete a product by ID
    deleteProduct: async (req, res) => {
        try {
            const deleted = await Product.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting product' });
        }
    }   
};

module.exports = productController;