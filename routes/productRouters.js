const { Router } = require('express');

const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.get('/products/search', productController.searchProductController);

productRouter.get('/products', productController.getAllProductController);

productRouter.get('/products/:id', productController.getProductByIdController);

productRouter.post('/products', productController.addProductController);

productRouter.put('/products/:id', productController.editProductController);

productRouter.delete('/products/:id', productController.deleteProductController);

module.exports = productRouter;
