const { Router } = require('express');
const saleController = require('../controllers/saleController');

const routerSale = Router();

routerSale.get('/sales', saleController.getAllSalesController);
routerSale.get('/sales/:id', saleController.getAllSaleByIdController);
routerSale.post('/sales', saleController.addSaleController);
routerSale.delete('/sales/:id', saleController.deleteSaleController);
routerSale.put('/sales/:id', saleController.editSalesController);

module.exports = routerSale;
