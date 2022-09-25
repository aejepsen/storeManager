const saleModel = require('../models/saleModels');

const saleService = {
  async getAllSaleService() {
    const sales = await saleModel.getAllSalesModel();
    return sales;
  },

  async getAllSaleByIdService(id) {
    const sale = await saleModel.getAllSaleByIdModel(id);
    return sale;
  },

  async addSaleService(sale) {
    const newSale = await saleModel.saleAddModel(sale);
    return newSale;
  },

  async deleteSaleService(id) {
    const sale = await saleModel.deleteSaleModel(id);
    return sale;
  },

  async editSalesService(editSale, saleId) {
    await saleModel.editSalesModel(editSale, saleId);
    return { saleId, itemsUpdated: editSale };
  },
};

  module.exports = saleService;
