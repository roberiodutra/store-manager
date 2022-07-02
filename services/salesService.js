const salesModel = require('../models/salesModel');
const bodyValidation = require('../middlewares/bodyValidation');

const createSale = async (sales, res) => {
  if (bodyValidation.sales(sales, res)) return;

  const saleId = await salesModel.createSale();
  await Promise.all(
    sales.map(async (sale) => {
      await salesModel.addSoldProducts(
        saleId.id, sale.productId, sale.quantity,
      );
    }));
  const sold = { id: saleId.id, itemsSold: sales };
  return sold;
};

module.exports = { createSale };
