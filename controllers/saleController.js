const saleService = require('../services/saleService');

const { validateSale } = require('../middlewares/saleMiddleware');  

const saleController = {
  async getAllSalesController(_req, res) {
    const allSales = await saleService.getAllSaleService();
    if (!allSales) {
      return res.status(400).json({ message: 'No sales found.' });
    }
    return res.status(200).json(allSales);
  },
  
  async addSaleController(req, res) {
    try {
      const productList = req.body;
      const validated = await validateSale(productList);
      if (validated === true) {
        const newSale = await saleService.addSaleService(productList);
        return res.status(201).json(newSale);
      }
      return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
      if (!error.code) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      return res.status(error.code).json({ message: error.message });
    }
  },

  async getAllSaleByIdController(req, res) {
    const { id } = req.params;
    const saleId = await saleService.getAllSaleByIdService(Number(id));
    if (!saleId || saleId.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(saleId);
  },

  async deleteSaleController(req, res) {
    const { id } = req.params;
    const sale = await saleService.deleteSaleService(Number(id));
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(204).json(sale);
  },

  async editSalesController(req, res) {
    try {
      const editSale = req.body; const saleId = Number(req.params.id);
      const existSale = await saleService.getAllSaleByIdService(saleId);
      if (!existSale.length) { return res.status(404).json({ message: 'Sale not found' }); }
      const validated = await validateSale(editSale);
      if (validated === true) {
        const newSale = await saleService.editSalesService(editSale, saleId);
        return res.status(200).json(newSale);
      }
      return res.status(404).json({ message: 'Sale not found' });
    } catch (error) { 
      if (!error.code) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(error.code).json({ message: error.message });
    }
  },

};

module.exports = saleController;
