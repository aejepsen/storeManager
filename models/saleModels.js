const connection = require('./connection');

const saleModel = {
  async saleAddModel(addSale) {
    const [addData] = await connection.query(
      'INSERT INTO StoreManager.sales (`date`) VALUES (now())',
    );
    await Promise.all(addSale.map(async (e) => {
      await connection.query(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [addData.insertId, e.productId, e.quantity],
      );
    }));
    return { id: addData.insertId, itemsSold: addSale };
  },

  async getAllSalesModel() {
    const [sales] = await connection.query(
      `SELECT salesProducts.sale_id AS saleId,
    sales.date,
    salesProducts.product_id as productId,
    salesProducts.quantity
    FROM StoreManager.sales_products AS salesProducts
    INNER JOIN StoreManager.sales AS sales
    ON salesProducts.sale_id = sales.id
    ORDER BY saleId ASC, productId ASC`,
    );
    return sales;
  },

  async getAllSaleByIdModel(id) {
    const [sale] = await connection.query(
      `SELECT sales.date,
    salesProducts.product_id AS productId,
    salesProducts.quantity
    FROM StoreManager.sales_products AS salesProducts
    INNER JOIN StoreManager.sales AS sales
    ON salesProducts.sale_id = sales.id
    WHERE salesProducts.sale_id IN (?)
    ORDER BY salesProducts.sale_id ASC, productId ASC`,
      [id],
    );
    return sale;
  },

  async deleteSaleModel(id) {
    const [sale] = await connection.query(
      'DELETE FROM StoreManager.sales WHERE id = ?',
      [id],
    );
    return sale.affectedRows;
  },

  async editSalesModel(editSale, saleId) {
    const [sale] = await Promise.all(editSale.map(async (e) => connection.query(
        'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
        [e.quantity, saleId, e.productId],
      )));
    return { saleId: sale.sale_id, itemsUpdated: editSale };
  },
};
  
module.exports = saleModel;
