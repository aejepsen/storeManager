const connection = require('./connection');

const productModel = {
  async getAllProductModel() {
    const [products] = await connection.query('SELECT * FROM StoreManager.products');
    return products;
  },

  async getProductByIdModel(id) {
    const [product] = await connection.query(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [id],
    );
    return product[0];
  },

  async editProductModel(name, id) {
    const [product] = await connection.query(
      'UPDATE StoreManager.products SET name = ? WHERE id = ?',
      [name, id],
    );
    return product;
  },

  async addProductModel(name) {
    const [{ insertId }] = await connection.query(
      'INSERT INTO StoreManager.products (name) VALUES (?)',
      [name],
    );
    return ({ id: insertId, name });
  },

  async deleteProductModel(id) {
    await connection.query(
      'DELETE FROM StoreManager.products WHERE id = ?',
      [id],
      );
    return true;
  },

  async searchProductModel(q) {
    const [product] = await connection.query(
      'SELECT * FROM StoreManager.products WHERE name LIKE ?',
      [`%${q}%`],
    );
    return product;
  },
};

module.exports = productModel;
