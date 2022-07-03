const salesModel = require('../models/salesModel');
const { productId, quantity } = require('../middlewares/bodyValidation');
const productsModel = require('../models/productsModel');

const createSale = async (sales, res) => {
  const products = await productsModel.getAll();
  const productsIds = products.map(({ id }) => id);
  const salesIds = sales.map((s) => s.productId)
    .every((each) => productsIds.includes(each));

  if (productId(sales, salesIds, res) || quantity(sales, res)) return;

  const saleId = await salesModel.createSale();
  await Promise.all(
    sales.map(async (sale) => {
      await salesModel.addSoldProducts(
        saleId.id, sale.productId, sale.quantity,
      );
    }),
  );
  const sold = { id: saleId.id, itemsSold: sales };
  return sold;
};

module.exports = { createSale };
