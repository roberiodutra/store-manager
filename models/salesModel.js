const { connection } = require('../helpers');

const createSale = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (sold_on) VALUES (now())',
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

module.exports = { createSale, addSoldProducts };
