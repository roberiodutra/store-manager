const salesModel = require('../models/salesModel');

const createSale = async (sales) => {
  const saleId = await salesModel.createSale();
  await Promise.all(
    sales.forEach(async (sale) => {
      await salesModel.addSoldProducts(
        saleId.insertId, sale.productId, sale.quantity,
      );
    }));
  const sold = { id: saleId.insertId, itemsSold: sales };
  return sold;
};
