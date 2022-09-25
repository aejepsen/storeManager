const productService = require('../services/productService');

const validateProduct = async (param) => {
  await Promise.all(param.map(async (e) => {
    if (!e.id) {
      const error = new Error('"id" is required'); error.code = 400; throw error;
    }
    if (!e.name) {
      const error = new Error('"name" is required'); error.code = 400; throw error;
    }
    if (e.name.length <= 5) {
      const error = new Error('"name" length must be at least 5 characters long');
      error.code = 422; throw error;
    }
    const f = await productService.getProductByIdService(e.id);
    if (!f) {
      const error = new Error('Product not found'); error.code = 404; throw error;
    }
    return 0;
  })); return true;
};

module.exports = { validateProduct };
