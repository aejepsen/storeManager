const productService = require('../services/productService');

const validateSale = async (productList) => {
  await Promise.all(productList.map(async (e) => {
    if (!e.productId) {
      const error = new Error('"productId" is required'); error.code = 400; throw error;
    }
    if (e.quantity <= 0) {
      const error = new Error('"quantity" must be greater than or equal to 1');
      error.code = 422; throw error;
    }
    if (!e.quantity) {
      const error = new Error('"quantity" is required'); error.code = 400; throw error;
    }
    const f = await productService.getProductByIdService(e.productId);
    if (!f) {
      const error = new Error('Product not found'); error.code = 404; throw error;
    }
    return 0;
  }));
  return true;
};

  module.exports = { validateSale };
