const { connection } = require('../helpers');

const createSale = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
  );
  const saleId = { id: sale.insertId };
  return saleId;
};

const addSoldProducts = async (saleId, productId, productQuantity) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products
      (sale_id, product_id, quantity)
        VALUES (?, ?, ?)`,
    [saleId, productId, productQuantity],
  );
};

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT 
      sp.sale_id AS saleId, 
      s.date, 
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY s.id ASC, sp.product_id ASC`,
  );
  return sales;
};

module.exports = { createSale, addSoldProducts, getAll };
