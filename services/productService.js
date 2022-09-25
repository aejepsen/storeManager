const productModel = require('../models/productModel');

const productService = {
  async getAllProductService() {
    const products = await productModel.getAllProductModel();
    return products;
  },

  async getProductByIdService(id) {
    const product = await productModel.getProductByIdModel(id);
    return product;
  },

  async addProductService(product) {
    const newProduct = await productModel.addProductModel(product);
    return newProduct;
  },

  async editProductService(name, id) {
    await productModel.editProductModel(name, id);
    return { id, name };
  },

  async deleteProductService(id) {
    await productModel.deleteProductModel(id);
    return true;
  },

  async searchProductService(q) {
    const product = await productModel.searchProductModel(q);
    return product;
  },
  
};

module.exports = productService;