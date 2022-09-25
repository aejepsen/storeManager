const productService = require('../services/productService'); 

const { validateProduct } = require('../middlewares/productMiddleware');

const productController = {
  async getAllProductController(_req, res) {
    const products = await productService.getAllProductService();
    if (!products) {
      return res.status(400).json({ message: 'No products found.' });
    }
    return res.status(200).json(products);
  },

  async getProductByIdController(req, res) {
    const { id } = req.params;
    const product = await productService.getProductByIdService(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  },

  async addProductController(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length <= 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    const newProduct = await productService.addProductService(name);
    return res.status(201).json(newProduct);
  },

  async editProductController(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const validated = await validateProduct([{ name, id }]);
      if (validated === true) {
        const updatedProduct = await productService.editProductService(name, id);
        return res.status(200).json(updatedProduct);
      }
      return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
      if (!error.code) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(error.code).json({ message: error.message });
    }
  },

  async deleteProductController(req, res) {
    const { id } = req.params;
    const productId = await productService.getProductByIdService(id);
    if (!productId) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productService.deleteProductService(id);
    return res.status(204).json({ message: 'Product deleted' });
  },

  async searchProductController(req, res) {
    const { q } = req.query;
    if (!q) {
      const products = await productService.getAllProductService();
      return res.status(200).json(products);
    }    
    const product = await productService.searchProductService(q);
    return res.status(200).json(product);
  },
};

module.exports = productController;
